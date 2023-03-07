tools = require("../models/toolsModel.js");

function gettools(in_json){
    return new Promise((resolve, reject) => {
        tools.find(in_json,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

module.exports = {gettools: gettools}