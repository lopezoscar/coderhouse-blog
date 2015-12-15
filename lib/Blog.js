"use strict";
var mongojs = require("mongojs");
var Blog = function(db){

    return {
        getBlogById:function(id,callback){
            db.blogs.find({_id:mongojs.ObjectId(id)},callback);
        },
        getBlogByUsername:function(username,callback){
            db.blogs.find({username:username || ""},callback);
        },
        addBlog:function(params,callback){
            if(params && params.name && params.owner){

                db.blogs.findOne({owner:params.owner,name:params.name},function(err,blog){
                   if(err){
                       callback(err,null);

                   }else if(blog != null){

                       callback({error:"Blog Already Exists with this Owner",_id:blog._id},null);
                   }else{
                       var newBlog = {
                           owner:params.owner,
                           name:params.name,
                           created_date: new Date(),
                           domain: params.domain || "localhost",
                           template:"default" || params.template
                       }
                       db.blogs.insert(newBlog,callback);
                   }
                });
            }else{
                callback({error:"Please, fill mandatory fields"},null);
            }
        }
    }
};

module.exports = Blog;