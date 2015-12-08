"use strict";

//Load Libraries
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var vhost = require('express-vhost');

//Create db instance
var CONFIG = require("./db");
var db = mongojs("mongodb://"+CONFIG.host+":"+CONFIG.port+"/"+CONFIG.db,CONFIG.collections);
//Load APP Libraries
global.Blog = require("./lib/Blog")(db);
global.Users = require("./lib/Users")(db);
global.Posts = require("./lib/Posts")(db);

function buildAPP(blog){
    var app = express();
    var template = blog.template || "default";

    //Set template engine
    app.set('view engine','handlebars');
    app.engine('hbs',exphbs());

    //Set static folders
    app.use(express.static('templates'));
    app.use(express.static('public/'+template));

    //Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    //Routing Endpoints
    app.use("/posts",require("./api/posts"));
    app.use("/users",require("./api/users"));
    app.use("/blog" ,require("./api/blog"));

    //Middleware
    app.use(function(req,res,next){
        req.options = {
            layout:template+'/layout.html',
            blog:blog,
            name:blog.name,
            title:blog.title,
            subtitle:blog.subtitle
        };
        next();
    });

    //One Page only
    app.get('/',function(req,res){
        Posts.getPosts({blog:blog._id},function(err,posts){
            console.log(err,posts);
            req.options.posts = posts;

            res.render('default/index.hbs',req.options);
        });
    });
    app.get('/post/:link',function(req,res){
        var params = {
            link:req.params.link,
            blog:req.options.blog._id
        };
        Posts.getPostByLink(params,function(err,post){
            console.log(err,post);
            req.options.post = post;
            req.options.name = post.title;
            req.options.title = post.title;
            req.options.subtitle = post.subtitle;

            res.render('default/post.hbs',req.options);
        });
    });

    return app;
}

//VHOST Logic
var server = express();
server.use(vhost.vhost(server.enabled('trust proxy')));

//Start Server on port
server.listen(process.argv[2],function(){
    console.log("SERVER UP");
});

vhost.register("blog.com", buildAPP({template:"default"}));

db.blogs.find({},function(err,blogs){
    if(err){
        console.log("DOMAINS NOT FOUND");
    }else{
        for(var i = 0; i < blogs.length; i++){
            vhost.register(blogs[i].domain, buildAPP(blogs[i]));
        }
    }
});



