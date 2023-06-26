# Name: Yangli Liu
# Name: Mingyi Xu
# Course: CS5200 Spring 2023
# Date: 4/19/2023

# Install Dependency
if("RSQLite" %in% rownames(installed.packages()) == FALSE) {
  install.packages("RMySQL")
}
if("RSQLite" %in% rownames(installed.packages()) == FALSE) {
  install.packages("RSQLite")
}

# Load Dependency
library(RMySQL)
library(RSQLite)

# Create a connection object to the MySQL database, please replace dbname and password with your local instance 
con <- dbConnect(MySQL(),
                 dbname = "LoadDataWarehouse",
                 host = "localhost",
                 port = 3306,
                 user = "root",
                 password = "YL1saf!!2015")

# Check if the connection was successful
if (dbIsValid(con)) {
  cat("Connected to MySQL database successfully!\n")
} else {
  cat("Failed to connect to MySQL database.\n")
}
dbSendQuery(con, "SET GLOBAL local_infile = true")

# Author fact table must include the authors id, author name, number of articles by that author, 
# total number of co-authors across all articles. Load the data from the SQLite Database created in Part 1.

# Create a star schema for author facts. In order to make the code faster, I think I don't need dimension tables. 
dbSendQuery(con, "CREATE TABLE IF NOT EXISTS AuthorFact (
                   author_id INTEGER NOT NULL,
                   author_name TEXT,
                   articles_count INTEGER,
                   co_authors_count INTEGER,
                   PRIMARY KEY (author_id)
                 );") 

# Connect to the SQLite database
fpath <- ""
dbfile <- "pubmed.db"
sqlite_con <- dbConnect(RSQLite::SQLite(), paste0(fpath, dbfile))

# Select data from SQLite and store in data frame
author_data <- dbGetQuery(sqlite_con, "SELECT Authors.id AS author_id, Authors.lastName || ', ' || Authors.forename AS author_name, 
                                       COUNT(DISTINCT Authorship.article_id) AS articles_count, COUNT(DISTINCT Authorship2.author_id) AS co_authors_count
                                       FROM Authors
                                       INNER JOIN Authorship ON Authors.id = Authorship.author_id
                                       INNER JOIN Publish ON Authorship.article_id = Publish.article_id
                                       INNER JOIN Authorship AS Authorship2 ON Publish.article_id = Authorship2.article_id
                                       GROUP BY Authors.id;")

# Loop over author_data data frame to insert into MySQL database as AuthorFact table
author_data$author_name <- gsub("'", " ", author_data$author_name)

for (i in seq_len(nrow(author_data))) {
  dbSendQuery(con, sprintf("INSERT INTO AuthorFact (author_id, author_name, articles_count, co_authors_count) VALUES (%d, '%s', %d, %d);",
                           author_data[i, "author_id"],
                           author_data[i, "author_name"],
                           author_data[i, "articles_count"],
                           author_data[i, "co_authors_count"]))
}

# Check the AuthorFact table
dbGetQuery(con, "SELECT * FROM AuthorFact LIMIT 10;")


# Create the JournalFact table in MySQL
dbSendQuery(con, "CREATE TABLE IF NOT EXISTS journalFact (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  journal_id INTEGER,
  journal_name TEXT,
  year INTEGER,
  quarter TEXT,
  month INTEGER,
  articles_per_year INTEGER,
  articles_per_quarter INTEGER,
  articles_per_month INTEGER
);")

# Basic journalDim construction
query_journal <- "SELECT Journals.id AS id, Journals.title AS journal_name
                  FROM Journals
                  GROUP BY Journals.id, journal_name;"

# Execute the query and insert the results into the journalDim table
result_journal <- dbGetQuery(sqlite_con, query_journal)
result_journal$journal_name <- gsub("'", " ", result_journal$journal_name)

# Number of articles published per year for yearDim
query_year <- "SELECT Journals.id As id, Journals.title AS journal_name, Publish.year AS year,
                      COUNT(DISTINCT Articles.id) AS articles_per_year
               FROM Journals
               INNER JOIN Publish ON Journals.id = Publish.journal_id
               INNER JOIN Articles ON Publish.article_id = Articles.id
               GROUP BY Journals.id,journal_name, year;
               "
# Execute the query and insert the results into the yearDim table
result_year <- dbGetQuery(sqlite_con, query_year)
# Handle a few special cases
result_year$journal_name <- gsub("'", " ", result_year$journal_name) 

# Number of articles published per quarter for quarterDim
query_quarter <- "SELECT Journals.id As id, Publish.year AS year, 
                  CASE 
                    WHEN (strftime('%m', Publish.date)) IN ('01', '02', '03') THEN 'Q1'
                    WHEN (strftime('%m', Publish.date)) IN ('04', '05', '06') THEN 'Q2'
                    WHEN (strftime('%m', Publish.date)) IN ('07', '08', '09') THEN 'Q3'
                    ELSE 'Q4'
                  END AS quarter, COUNT(DISTINCT Articles.id) AS articles_per_quarter
                  FROM Journals
                  INNER JOIN Publish ON Journals.id = Publish.journal_id
                  INNER JOIN Articles ON Publish.article_id = Articles.id
                  GROUP BY Journals.id, year, quarter;"

# Execute the query and insert the results into the quarterDim table
result_quarter <- dbGetQuery(sqlite_con, query_quarter)

# Number of articles published per month for monthDim 
query_month <- "SELECT Journals.id, Publish.year AS year, substr(Publish.date, 6, 2) AS month, 
                CASE 
                    WHEN (strftime('%m', Publish.date)) IN ('01', '02', '03') THEN 'Q1'
                    WHEN (strftime('%m', Publish.date)) IN ('04', '05', '06') THEN 'Q2'
                    WHEN (strftime('%m', Publish.date)) IN ('07', '08', '09') THEN 'Q3'
                    ELSE 'Q4'
                END AS quarter,
                       COUNT(DISTINCT Articles.id) AS articles_per_month
                FROM Journals
                INNER JOIN Publish ON Journals.id = Publish.journal_id
                INNER JOIN Articles ON Publish.article_id = Articles.id
                GROUP BY Journals.id, year, month, quarter;
                "

# Execute the query and insert the results into the monthDim table
result_month <- dbGetQuery(sqlite_con, query_month)

# Construct the JournalFact table using corresponding queries

# Merge the result_journal and result_year dataframes on the 'id' column
journal_year <- merge(result_journal, result_year, by = c('id', 'journal_name'))

# Merge the journal_year and result_quarter dataframes on the 'id' and 'year' columns
journal_year_quarter <- merge(journal_year, result_quarter, by = c('id', 'year'))

# Merge the journal_year_quarter and result_month dataframes on the 'id', 'year', and 'quarter' columns
journal_year_quarter_month <- merge(journal_year_quarter, result_month, by = c('id', 'year', 'quarter'))

# Construct fact table
for (i in 1:nrow(journal_year_quarter_month)) {
  # Extract values for the current row
  journal_id <- journal_year_quarter_month$id[i]
  journal_name <- journal_year_quarter_month$journal_name[i]
  year <- journal_year_quarter_month$year[i]
  quarter <- journal_year_quarter_month$quarter[i]
  month <- journal_year_quarter_month$month[i]
  articles_per_year <- journal_year_quarter_month$articles_per_year[i]
  articles_per_quarter <- journal_year_quarter_month$articles_per_quarter[i]
  articles_per_month <- journal_year_quarter_month$articles_per_month[i]
  
  # Construct the SQL query for inserting the current row into the journalFact table
  insert_query <- paste("INSERT INTO journalFact (journal_id, journal_name, year, quarter, month, articles_per_year, articles_per_quarter, articles_per_month)",
                        "VALUES (", journal_id, ",", "'", journal_name, "'", ",", year, ",", "'", quarter, "'", ",", month, ",", articles_per_year, ",", articles_per_quarter, ",", articles_per_month, ");", sep="")
  
  # Execute the SQL query using the database connection 'con'
  dbSendQuery(con, insert_query)
}

# Check the JournalFact table
dbGetQuery(con, "SELECT * FROM JournalFact LIMIT 10;")

# Disconnect from SQLite database
dbDisconnect(sqlite_con)

# Disconnect from MySQL database
dbDisconnect(con)
