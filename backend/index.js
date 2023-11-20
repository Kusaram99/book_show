// Import the required modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import router from './router/router.js';
import db from './db/db.js'
import { config } from 'dotenv';

// dotenv's fuction to hide private keys
config();

// Create an instance of the Express application
const app = express();

// Helmet for enhanced security headers
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

// Body Parser for parsing JSON data 
app.use(bodyParser.json({ limit: '50mb' }));
// Body Parser for URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));


app.use(router);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the Express server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
