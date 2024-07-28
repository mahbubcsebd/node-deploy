const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = process.env;

const connectToDatabase = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to database!');
    } catch (error) {
        console.log('Connection failed!', error);
    }
}

module.exports = connectToDatabase;
