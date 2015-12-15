"use strict";

var express = require("express");
var router  = express.Router();

router.get('/',function(req,res){
    var blogID = req.options.blog._id;
    Posts.getPosts({blog:blogID},function(err,posts){
       if(err){
           res.json(err);
       }else{
           res.json(posts);
       }
    });
});

router.get('/:blog/:post',function(req,res){
    Posts.getPostByLink(req.params,function(err,post){
        if(err){
            res.json(err);
        }else{
            res.json(post);
        }
    });
});



router.post('/add',function(req,res){
    Posts.add(req.body,function(err,post){
        if(err){
            res.json(err);
        }else{
            res.json(post);
        }
    });
});

module.exports = router;