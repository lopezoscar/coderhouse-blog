"use strict";

var CONFIG = require("../db");
var mongojs = require("mongojs");
var db = mongojs("mongodb://"+CONFIG.host+":"+CONFIG.port+"/"+CONFIG.db,CONFIG.collections);
//Load APP Libraries
var Blog = require("../lib/Blog")(db);
var Users = require("../lib/Users")(db);
var Posts = require("../lib/Posts")(db);




function createPost(){
    var newPost = {
        blog: mongojs.ObjectID("5671a8a89abb696e13bea778"),
        title:"Primer Post de Tu papá 2",
        author:mongojs.ObjectID("5671a79801e0667212aa8e43"),
        body:"<h1>El post estaría bueno con ALTO WYSWYG</h1>",
        link:"primer-post"
    };
    Posts.add(newPost,function(err,post){
       console.log(err,post);
    });
}

createPost();