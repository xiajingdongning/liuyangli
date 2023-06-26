#Name1: Minyi Xu
#Name2: Yangli Liu
#CS 5200
#Practicum 2 - part 1 Load XML Data into Database

# Load Dependencies
library('XML')
library('RSQLite')
library('sqldf')
library('dplyr')

# Establish SQLite connection
fpath <- ""
dbfile <- "pubmed.db"
dbcon <- dbConnect(RSQLite::SQLite(), paste0(fpath, dbfile))

# Drop table exists for housekeeping purposes
dbSendQuery(dbcon, "DROP TABLE IF EXISTS Journals")
dbSendQuery(dbcon, "DROP TABLE IF EXISTS Articles")
dbSendQuery(dbcon, "DROP TABLE IF EXISTS Authors")
dbSendQuery(dbcon, "DROP TABLE IF EXISTS Publish")
dbSendQuery(dbcon, "DROP TABLE IF EXISTS Authorship")

# Create 5 Tables： Articles, Authors, Journals, 
# Articles Table
dbSendQuery(dbcon, "CREATE TABLE IF NOT EXISTS Articles (
  id INTEGER,
  title TEXT,
  PRIMARY KEY (id)
);")

# Authors Table
dbSendQuery(dbcon, "CREATE TABLE IF NOT EXISTS Authors (
  id INTEGER,
  lastName TEXT,
  forename TEXT,
  initials TEXT,
  suffix TEXT,
  affiliation TEXT,
  collectivename TEXT,
  PRIMARY KEY (id)
);")

# Journals Table
dbSendQuery(dbcon, "CREATE TABLE IF NOT EXISTS Journals (
  id INTEGER, 
  issn TEXT,
  title TEXT,
  isoabbreviation INTEGER,
  PRIMARY KEY (id)
);")

# Publish Details Tables
dbSendQuery(dbcon, "CREATE TABLE IF NOT EXISTS Publish (
    id INTEGER, 
    article_id INTEGER, 
    journal_id INTEGER,
    volume INTEGER, 
    issue INTEGER, 
    year INTEGER, 
    month Text, 
    day INTEGER, 
    season TEXT, 
    medlinedate TEXT, 
    pmid TEXT, 
    date TEXT, 
    PRIMARY KEY (id), 
    FOREIGN KEY (article_id) REFERENCES Articles(id), 
    FOREIGN KEY (journal_id) REFERENCES Journals(id)
);")

# Author Relationship Table
dbSendQuery(dbcon, "CREATE TABLE IF NOT EXISTS Authorship (
  id INTEGER, 
  author_id INTEGER, 
  article_id INTEGER, 
  FOREIGN KEY (article_id) REFERENCES Articles(id), 
  FOREIGN KEY (author_id) REFERENCES Authors(id)
);")


# Load, extract, and transform the data from the XML file in the folder 
# and then save the data into the appropriate tables in the database. 
print("Loading XML ...")
# Load XML to XMLObj
path    <- "pubmed-tfm-xml/"
xmlFile <- "pubmed22n0001-tf.xml"
# XML data file path
fp      <- paste0(path, xmlFile)
# Read XML 
xmlObj     <- xmlParse(fp)
# Get roots and the length of XML file
rootnode  <- xmlRoot(xmlObj)
numArticle <- xmlSize(rootnode)
numArticle

# Steps:
# 1. Create an empty data frame
# 2. Parsing and cleaning data to the data frame
# 3. dbwritetable to database


# Get Raw Article
print(" Extract Articles ...")
raw.articles          <- xpathSApply(rootnode, "//Article/PubDetails/ArticleTitle", xmlValue)
print(length(raw.articles))
raw.articles.df       <- data.frame(id    = vector (mode = "integer",   length = length(raw.articles)),
                                    title = vector (mode = "character", length = length(raw.articles)),
                                    stringsAsFactors = F)
raw.articles.df$title <- raw.articles
raw.articles.df$id    <- 1:length(raw.articles)
# raw.articles.df 


# Get Raw Journal
print(" Extract Journals ...")
raw.journal.duplicated.df     <- xmlToDataFrame(getNodeSet(rootnode, "//Journal"))
# Remove PubIssue Info
raw.journal.duplicated.df     <- raw.journal.duplicated.df[, c('ISSN', 
                                                               'Title', 
                                                               'ISOAbbreviation')]
# assign anchor to speed up mapping
raw.journal.duplicated.df$raw <- paste(raw.journal.duplicated.df$ISSN, 
                                       raw.journal.duplicated.df$Title, 
                                       raw.journal.duplicated.df$ISOAbbreviation)
# raw.journal.duplicated.df 

# Remove Duplicated
print(" Get unique Journals ...")
raw.unique.journal.df    <- raw.journal.duplicated.df[!duplicated(raw.journal.duplicated.df), ]
# Assign id
raw.unique.journal.df$id <- 1:nrow(raw.unique.journal.df)
# raw.unique.journal.df



# Get Raw PubDate
print(" Extract Publish info ...")
raw.publish.df            <- xmlToDataFrame(getNodeSet(rootnode, "//PubDate"))
# Get Raw JournalIssue
raw.journalissue.df       <- xmlToDataFrame(getNodeSet(rootnode, "//JournalIssue"))
raw.publish.df$Volume     <- as.integer(raw.journalissue.df$Volume)
raw.publish.df$Issue      <- as.integer(raw.journalissue.df$Issue)
raw.publish.df$PMID       <- xpathSApply(rootnode, "//Article", xmlGetAttr, 'PMID')
# raw.publish.df


print(" Map Journal Id to Publish info ...")
# assign anchor to speed up the mapping
raw.publish.df$raw_journal <- raw.journal.duplicated.df$raw
# assign article_id due to 1 to 1 association
raw.publish.df$article_id  <- 1:nrow(raw.publish.df)
# assign id
raw.publish.df$id          <- 1:nrow(raw.publish.df)
# Map Journal_id to publish association
raw.publish.df$journal_id  <- sqldf(" SELECT u.id as journal_id  FROM `raw.publish.df` d
                                    LEFT JOIN `raw.unique.journal.df` u
                                    ON  u.'raw' = d.'raw_journal'", drv="SQLite")$journal_id

# raw.publish.df

# Get Raw Author
print(" Extract AuthorList ...")
raw.authors.duplicated.df     <- xmlToDataFrame(getNodeSet(rootnode, "//Author"))
# Assign Anchor to speed up the mapping
raw.authors.duplicated.df$raw <-   xpathSApply(rootnode, "//Author", xmlValue)
print(" Get unique Authors ...")
# Remove Duplicated
raw.uniuqe.authors.df         <- raw.authors.duplicated.df[!duplicated(raw.authors.duplicated.df), ]
# Assign id
raw.uniuqe.authors.df$id      <- 1:nrow(raw.uniuqe.authors.df)
# raw.uniuqe.authors.df


print("Map Authors to AuthorArticle ...")
# sudo article_id it will be replaced with ture id in loop
raw.authors.duplicated.df$article_id <- 1:nrow(raw.authors.duplicated.df)
# Map author_id to write association
raw.authors.duplicated.df$author_id  <- sqldf("SELECT  u.id as author_id FROM `raw.authors.duplicated.df` d
                                               LEFT JOIN `raw.uniuqe.authors.df` u
                                               ON  u.'raw' = d.'raw'", drv="SQLite")$author_id
raw.authors.duplicated.df$id         <- 1:nrow(raw.authors.duplicated.df)
# raw.authors.duplicated.df


writeIdx = 1
print("Map Articles to AuthorArticle via loop ...")
# Iterate node set, to map Author Article Association and Journal - Article Association
for (articleIdx in 1: numArticle)
{
  if(articleIdx %% (numArticle / 20) == 0)
  {
    print(paste(articleIdx / (numArticle / 20) * 5, "% ..."))
  }
  
  aNode     <- rootnode[[articleIdx]]
  anArticle <- aNode[[1]]
  numEl     <- xmlSize(anArticle)
  
  # handle author article association
  authorList <- anArticle[['AuthorList']]
  if(!is.null(authorList)) 
  {
    numAuthor         <- xmlSize(authorList)
    for(authorIdx in 1:numAuthor)
    {
      raw.authors.duplicated.df[writeIdx, ]$article_id <- articleIdx
      writeIdx <- writeIdx + 1
    }
  }
}  


print("Rename DF's Col names to fit the schema ... ")

clean.article.df        <- raw.articles.df


clean.authors.df <- sqldf("SELECT
                                id 
                              , ForeName        AS forename 
                              , LastName        AS lastName 
                              , Initials        AS initials 
                              , Suffix          AS suffix 
                              , AffiliationInfo AS affiliation  
                              , CollectiveName  AS collectivename 
                            FROM
                              `raw.uniuqe.authors.df`;", drv="SQLite")

clean.journal.df <- sqldf("SELECT
                                id 
                              , ISSN             AS issn 
                              , Title            AS title 
                              , ISOAbbreviation  AS isoabbreviation 
                            FROM
                              `raw.unique.journal.df`;", drv="SQLite")

clean.authorarticle.df  <- raw.authors.duplicated.df[, c('id', 'author_id', 'article_id')]

# Date Conversion Scheme: 
#1. The date conversion scheme for JournalIssue involves storing year, month, day, 
  # and season attributes, with year being non-nullable. 
#2. Numeric months are converted to 3-letter strings. 
#3. PubIssue node can have MedlineDate, Year/(Month)/(Day), or Year/(Season) combinations. 
#4. MedlineDate time spans are converted by taking the first occurrence of 
# month, year, season, or day. 
#5. Seasons and months are mapped to quarters for further analysis. 
#6. The first month of each quarter is mapped to its corresponding season. 
#7. Finally, publish dates are converted based on the first occurrence rule.

print("Convert Pubish Date scheme ... ")

clean.publish.df <- sqldf("
SELECT id, article_id, journal_id, Volume AS volume, Issue AS issue,
       COALESCE(SUBSTR(MedlineDate, 1, 4), `Year`) AS year,
       COALESCE(CASE 
                    WHEN MedlineDate IS NOT NULL AND
                         SUBSTR(upper(MedlineDate), 6) GLOB '[A-Z][A-Z][A-Z]*'
                         THEN SUBSTR(upper(MedlineDate), 6, 1) || SUBSTR(lower(MedlineDate), 7, 2)
                    END,
                CASE 
                    WHEN `Month` BETWEEN '01' AND '12' 
                         THEN SUBSTR('JanFebMarAprMayJunJulAugSepOctNovDec', (`Month` - 1) * 3 + 1, 3)
                    ELSE `Month`
                END) AS month,
       COALESCE(CASE 
                    WHEN MedlineDate IS NOT NULL AND
                         SUBSTR(upper(MedlineDate), 6) GLOB '[A-Z][A-Z][A-Z] [0-9]*'
                         THEN SUBSTR(MedlineDate, 10, LENGTH(SUBSTR(MedlineDate, 10)) - INSTR(SUBSTR(MedlineDate, 10), '-'))
                END, `Day`) AS day,
       COALESCE(CASE 
                    WHEN MedlineDate IS NOT NULL AND
                         SUBSTR(MedlineDate, 11) GLOB '[A-Z][a-z]*'
                         THEN SUBSTR(MedlineDate, 11, LENGTH(SUBSTR(MedlineDate, 11)) - INSTR(SUBSTR(MedlineDate, 11), '-'))
                END, `Season`) AS season,
       MedlineDate AS medlinedate,
       PMID AS pmid
FROM `raw.publish.df`", drv = 'SQLite')

clean.publish.df <- transform(clean.publish.df,
                              month = ifelse(!is.null(season) & is.null(month),
                                             switch(season, Spring = 'Apr', Summer = 'Jul', Fall = 'Oct', Winter = 'Jan'),
                                             month))

clean.publish.df$date <- sqldf("
SELECT  CASE WHEN `year` IS NOT NULL
        THEN `year` || '-' ||
              COALESCE(CASE 
                            WHEN `month` IS NOT NULL
                            THEN SUBSTR('010203040506070809101112', INSTR('JanFebMarAprMayJunJulAugSepOctNovDec', `month`) / 3 * 2 + 1, 2)
                        END, '01') || '-' ||
              COALESCE(`day`, '01')
        END as date
FROM `clean.publish.df`", drv = 'SQLite')$date



print("Load df into tables ... ")
dbWriteTable(dbcon, "Articles",   clean.article.df,       row.names = FALSE, append=TRUE)
dbWriteTable(dbcon, "Authors",    clean.authors.df,       row.names = FALSE, append=TRUE)
dbWriteTable(dbcon, "Journals",   clean.journal.df,       row.names = FALSE, append=TRUE)
dbWriteTable(dbcon, "Publish",    clean.publish.df,       row.names = FALSE, append=TRUE)
dbWriteTable(dbcon, "Authorship", clean.authorarticle.df, row.names = FALSE, append=TRUE)

#clean.article.df
#clean.authors.df
#clean.journal.df
#clean.publish.df
#clean.authorarticle.df
print("Finished, disconnect from sqlite ... ")

dbDisconnect(dbcon)
