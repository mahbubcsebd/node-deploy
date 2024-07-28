const express = require('express');
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute")
const connectToDatabase = require('./connectToDatabase');
require('dotenv').config();

const {PORT} = process.env;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);




app.listen(PORT, (async () => {
    try {
        console.log(`server is running port http://localhost:${PORT}`);
        await connectToDatabase();

    } catch (error) {
        console.log(error.message)
    }
}))