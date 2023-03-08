const users = require('../models/userModel.js');

function getUserId(un, pw) {
    return new Promise((resolve, reject) => {
        users.findOne({username:un, password:pw},(err,data)=>{
            if(err) {resolve("");}
            if (data){resolve(data.id);}
            else {resolve("");}
        });
    });
}

function getUsers(in_json){
    return new Promise((resolve, reject) => {
        users.find(in_json,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function setUser(filter, newData){
    // console.log('fileter is ',filter);
    // console.log('newdata is',newData);
    return new Promise((resolve, reject) => {
        users.updateOne(filter, newData,(err,data)=>{
            if(err) reject(err);
            resolve(data.borrowed);
        })
    })
}

function createUser(newUser){
    return new Promise((resolve, reject) => {
        users.create(newUser,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    })
}

function deleteUser(in_json){
    return new Promise((resolve, reject) => {
        users.deleteOne(in_json,(err,data)=>{
            if (err) reject(err);
            else resolve(data);
        })
    })
}





module.exports = {
    getUserId:getUserId,
    getUsers:getUsers
};