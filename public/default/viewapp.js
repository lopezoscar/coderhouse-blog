"use strict";

var BlogClient = function(){

    return {
        getPosts:function(){
            $.get('/posts',function(posts){
                console.log(posts);
            })
        }
    }
};