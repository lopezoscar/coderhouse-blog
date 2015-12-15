"use strict";

var express = require("express");
var router  = express.Router();

router.get('/id/:id',function(req,res){
    Blog.getBlogById(req.params.id,function(err,blog){
       if(err){
           res.json(err);
       }else{
           res.json(blog);
       }
    });
});

router.get('/owner/:owner',function(req,res){
   Users.getUserByUsername(req.owner,function(err,user){
       if(err){
           res.status(500);
       }else{
           Blog.getBlogByUsername(user.username,function(err,blogs){
                if(err){
                    res.status(500);
                }else{
                    res.json(blogs);
                }
           })
       }
   });
});

router.post('/add',function(req,res){
    Blog.addBlog(req.body,function(err,blog){
       if(err){
           res.json(err);
       }else{
           res.json(blog);
       }
    });
});

module.exports = router;