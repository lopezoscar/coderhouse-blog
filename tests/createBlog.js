"use strict";

var CONFIG = require("../db");
var mongojs = require("mongojs");
var db = mongojs("mongodb://"+CONFIG.host+":"+CONFIG.port+"/"+CONFIG.db,CONFIG.collections);
//Load APP Libraries
var Blog = require("../lib/Blog")(db);
var Users = require("../lib/Users")(db);
var Posts = require("../lib/Posts")(db);




function createBlog(){
    var newBlog = {
        name:"El Blog de Tu Papá 2",
        owner: mongojs.ObjectID("5671a79801e0667212aa8e43"),
        domain:"blog2.com"
    };
    Blog.addBlog(newBlog,function(err,blog){
       console.log(err,blog);
    });
}

createBlog();