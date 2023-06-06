const express = require('express')
const app = express()
require('./src/configs/db')
require('dotenv').config();
const cors = require('cors');
const userRouter = require('./src/routes/user')
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON data
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use('/users', userRouter)

app.listen(5000, () => {
    console.log('run on 5000')
})