// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/*bodyParser*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { all } = require('proxy-addr');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port,()=>{console.log(`Running on localhost Port: ${port}`)});

//get route
app.get('/alldata',(req,res)=>res.send(projectData));

//post route
app.post('/postdata',(req,res)=>{
    projectData = { 
        date:req.body.date,
        temp:req.body.temp,
        feelings:req.body.feelings
    }
    // console.log(projectData);
    res.send(projectData)
})

