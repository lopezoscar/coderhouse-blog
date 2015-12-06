"use strict";
var mongojs = require("mongojs");
function Users(db){
    return {
        getUserById:function(id,callback){
            db.users.findOne({_id:mongojs.ObjectId(id)},callback);
        },
        add:function(params,callback){
            if(params && params.username){
                db.users.findOne({username:params.username},function(err,exist){
                    if(err){
                        callback(err,null);
                    }else if(exist != null){
                        callback({error:"User already exists",_id:exist._id},null);
                    }else{
                        var user = {
                            username: params.username,
                            create_date:new Date()
                        };
                        db.users.insert(user,callback);
                    }
                });
            }else{
                callback({error:"fill username"},null);
            }
        }
    };
}

module.exports = Users;