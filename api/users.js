"use strict";
var express = require("express");
var router = express.Router();

router.get('/id/:id',function(req,res,next){
    Users.getUserById(req.params.id,function(err,user){
        console.log("GETTING USER ",req.params.id);
        if(err){
            res.json(err);
        }else{
            res.json(user);
        }
    });
});
router.get('/username/:username',function(req,res,next){
    Users.getUserByUsername(req.username.id,function(err,user){
        console.log("GETTING USER ",req.params.id);
        if(err){
            res.json(err);
        }else{
            res.json(user);
        }
    });
});

router.post('/add',function(req,res,next){
    Users.add(req.body,function(err,user){
        if(err){
            res.json(err);
        }else{
            res.json(user);
        }
    });
});

module.exports = router;