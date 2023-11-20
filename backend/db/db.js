// Import the mongoose library
import mongoose from 'mongoose';

const username = "kusaram";
const password = "Pass1999";
const clusterUrl = "cluster0.txddmc7.mongodb.net";
const dbName = "bookmyshow";


// Define the MongoDB connection string. 
const url = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`; 

// Set up the MongoDB connection using mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

export default mongoose;
