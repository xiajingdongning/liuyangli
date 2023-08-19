import mongodb from 'mongodb'; 
import dotenv from  'dotenv';
import app from './server.js';
import CitiesDAO from './DAO/citiesDAO.js'; 
import ReviewsDAO from './DAO/reviewsDAO.js'; 
import FavoritesDAO from'./DAO/favoritesDAO.js';
import VisitedDAO from './DAO/VisitedDAO.js';




async function main() {
    dotenv.config();
    
    const client = new mongodb.MongoClient(
        process.env.CITIESREVIEWS_DB_URI
    );
    const port = process.env.PORT || 8000;
    
    try { 
        await client.connect();
        await CitiesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);
        await VisitedDAO.injectDB(client);
        
        

        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    
    } catch (e) {
      console.error(e);
      process.exit (1);
    }
}
main().catch(console.error);

export default app;