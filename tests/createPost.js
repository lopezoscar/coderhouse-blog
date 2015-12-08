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
        blog: mongojs.ObjectID("5664bc57c7ad518c3718b688"),
        title:"Primer Post",
        author:mongojs.ObjectID("5664b86fa5542517369116fb"),
        body:"<h1>Mi super post del blog</h1>",
        link:"primer-post"
    };
    Posts.add(newPost,function(err,post){
       console.log(err,post);
    });
}

createPost();