const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();
const authRoute = require('./routes/auth');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
console.log("Auth routes loaded");
app.get("/", (req, res) => {
    res.send("Server is working");
});

mongoose.connect('mongodb://localhost:27017/Test')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));