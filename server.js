const express = require('express');
const mongoose = require('mongoose');

const mongoString = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017';

const PORT = process.env.PORT || 3001;

// Built in Express function that parses incoming requests to JSON
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();


const routes = require('./routes');

app.use(express.json());
app.use(routes);

// Start up express server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
