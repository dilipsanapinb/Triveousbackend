const express = require('express');
require('dotenv').config();

const port=process.env.PORT || 5000
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the triveous app" })
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})