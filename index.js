//the web server
const express = require('express');
const server = express();

//create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

//handle application/json requests
server.use(express.json());

//static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

//CORS
const cors = require('cors');
server.use(cors());

//the API
server.use('/api', require('./routes'));

//by default serve the react app if route is unrecognized
server.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

//DB connection
const client = require('./db/client');

//connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    console.log(`Server is running on PORT ${ PORT }!`);

    try {
        await client.connect();
        console.log(`Database is open!`);
    } catch (error) {
        console.error('Database is closed!', error);
    }
})