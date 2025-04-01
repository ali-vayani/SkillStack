const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const fs = require('fs');

async function insertData() {
    const MONGO_URI = 'mongodb+srv://test1:anNgo@cluster0.eewtw.mongodb.net/'
    
    // Create a new MongoClient instance and connect
    const client = new MongoClient(MONGO_URI); // Initialize client here

    try {
        // Connect using Mongoose for other parts of the application
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB using Mongoose');
        
        // Connect using MongoClient for bulk insert
        await client.connect();
        console.log('Connected to MongoDB using MongoClient');
        
        // Read the JSON file and parse it into an array
        const jsonArray = JSON.parse(fs.readFileSync('test.json', 'utf-8'));

        const database = client.db('skillstack');  // Replace with your database name
        const collection = database.collection('questions');  // Replace with your collection name

        const result = await collection.insertMany(jsonArray);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // Close both connections
        await client.close();
        await mongoose.connection.close();
    }
}

insertData().catch(console.error);
