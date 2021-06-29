const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')
const app = express();



//connect to DB
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//on connection
mongoose.connection.on('connected',() => {
    console.log('Connected to database'+ config.database);
});
//error
mongoose.connection.on('error',(err) => {
    console.log('database error'+ err);
});


const users = require('./routes/users');

//portnumber
const port = 3000;


app.use(cors());

//static folder
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

app.get('/', (req, res) => {
    res.send('invalid endpoint');
})

app.listen(port, () => {
    console.log('server started on port' + port);
});