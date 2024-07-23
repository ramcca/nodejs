const express = require('express');
const db = require('./config/db');
const movies = require('./controllers/Movies');
const employee = require('./controllers/Employee');
const projectRoutes = require("./controllers/Project");
const bodyParser = require('body-parser')
const utilityController = require('./controllers/Utility');

const app = express();


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));



const port = 3000;


app.use(express.static(__dirname + '/public'));
//app.set('View ')

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('/movies',movies);
app.use('/employee',employee);
app.use('/project',projectRoutes);
app.use('/utility',utilityController);



app.get('/',(req,res)=>{
    res.render('index',{headTitle:'Welcome to home page',menu:'home'});
})
app.listen(port,(req,res)=>{
    console.log(`server is running at ${port}`);
})