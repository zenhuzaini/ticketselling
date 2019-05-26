const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//to get access to .the env
require('dotenv/config');

//set views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set folders for resources
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jsjquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//middlewares//
app.use(bodyParser.json());
app.use(cors());

//--import routes
const concertRouter = require('./routes/R_concert');
const buyTicketRouter = require('./routes/R_buyticket');
app.use('/concert', concertRouter);
app.use('/buyticket', buyTicketRouter);

//ROUTES//
app.get('/', (req, res) =>{
    res.redirect('/concert');
});


//Connect to Mongo Atlas
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Hooray connected to Mongo Atlas!'));


//listen the server
app.listen(3000);

