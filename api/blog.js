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