"use strict";

var express = require("express");
var router  = express.Router();

router.get('/:post',function(req,res){
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