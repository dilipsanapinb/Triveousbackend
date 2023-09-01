const express = require('express');
require('dotenv').config();
const connection = require('./config/db');
const userRoute = require('./routes/auth.routes');
const categoryRoute=require('./routes/category.routes')
const port=process.env.PORT || 5000
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the triveous app" })
});

// routes
app.use('/api/user', userRoute);
app.use('/api/category',categoryRoute)

app.listen(port, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log('Something went wrong at connecting the DB');
    }
    console.log(`Server is running on port: ${port}`);
})