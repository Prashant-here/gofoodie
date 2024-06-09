const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://prashanthere0709:5DM9vwrAldC3Bk4T@cluster0.onlub4x.mongodb.net/gofoodmern";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`Connected to MongoDB at ${mongoose.connection.host}`);
        
        // Access the database and collection
        const db = mongoose.connection.db;
        const foodItemsCollection = db.collection('food_items');
        const foodCategoryCollection = db.collection('foodCategory');

        // Fetch data from the collections
        const foodItems = await foodItemsCollection.find({}).toArray();
        const foodCategories = await foodCategoryCollection.find({}).toArray();

        // Set global variables
        global.food_items = foodItems;
        global.foodCategory = foodCategories;

    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
    }
};

module.exports = mongoDB;


module.exports = mongoDB;
