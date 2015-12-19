"use strict";

var CONFIG = require("../db");
var mongojs = require("mongojs");
var db = mongojs("mongodb://"+CONFIG.host+":"+CONFIG.port+"/"+CONFIG.db,CONFIG.collections);
//Load APP Libraries
var Blog = require("../lib/Blog")(db);
var Users = require("../lib/Users")(db);
var Posts = require("../lib/Posts")(db);

function createUser(username){
    Users.add({username:username},function(err,user){
        console.log(err,user);
    });
}

createUser("lopezoscar");