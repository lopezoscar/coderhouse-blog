"use strict";

//Load Libraries
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");

//Create db instance
var CONFIG = require("./db");
var db = mongojs("mongodb://"+CONFIG.host+":"+CONFIG.port+"/"+CONFIG.db,CONFIG.collections);

//Load APP Libraries
global.Blog = require("./lib/Blog")(db);
global.Users = require("./lib/Users")(db);
global.Posts = require("./lib/Posts")(db);

//Set template engine
app.set('view engine','handlebars');
app.engine('html',exphbs());

//Set static folders
app.use(express.static('templates'));
app.use(express.static('public/default'));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routing Endpoints
app.use("/posts",require("./api/posts"));
app.use("/users",require("./api/users"));
app.use("/blog" ,require("./api/blog"));

//One Page only
app.get('/',function(req,res){
    res.render('default/index.html',{layout:false});
});

//Start Server on port
app.listen(process.argv[2],function(){
    console.log("SERVER UP");
});

