"use strict";

function Posts(db){

    return {
        getPostByLink:function(params,callback){
            db.posts.findOne({link:params.link,blog:params.blog},callback);
        },
        add:function(params,callback){
            if(params.blog && params.title && params.author && params.body && params.link){
                db.posts.findOne({link:params.link,blog:params.blog},function(err,post){
                   if(err){
                        callback(err,null);
                   }else if(post != null){
                       callback({error:"Link already exists on this blog",_id:post._id},null);
                   }else{
                       var newPost = {
                           title: params.title,
                           subtitle: params.subtitle,
                           author: params.author,
                           body: params.body,
                           created_date: new Date(),
                           category: params.category,
                           blog:params.blog,
                           pictures: params.pictures || [],
                           comments: []
                       };
                       db.posts.insert(newPost,callback);
                   }
                });
            }else{
                callback({error:"Please fill mandatories fields (blog,title,author,body,link)"},null);
            }
        }
    }
}

module.exports = Posts;