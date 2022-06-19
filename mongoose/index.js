const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const mongoString = process.env.DATABASE_URL
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(mongoString, { useNewUrlParser: true});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
});

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});