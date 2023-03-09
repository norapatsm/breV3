const tools = require("../models/toolsModel.js");
const users = require('../models/userModel.js');

function gettools(in_json){
    return new Promise((resolve, reject) => {
        tools.find(in_json,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function borrowTool(userid,toolid,amount){
    return new Promise((resolve, reject) => {
        let tooInStock=0;
        /**ดูว่ามีของเท่าไร */
        tools.findById(toolid,(err,data)=>{
            if(err) reject(err);
            tooInStock = data.amount;
        });
        /** ตัด stock */
        tooInStock-=amount;
        tools.findByIdAndUpdate(userid,{amount:tooInStock},(err,data)=>{
            if(err) reject(err);
        });
        /** check ว่ามีของนั้นยืมอยู่รึป่าว
         * ถ้ามียืมอยู่เเล้วให้บวกเข้าไปเพิ่ม
         * ถ้ายังไม่มี ให้้เพิ่ม id เเละ value ที่ยืม
         */
        let haveThatItem = false;
        users.findById(userid,(err,data)=>{
            /** ทำต่อด้วย */
        })
    })
}

module.exports = {
    gettools: gettools , 
    borrowTool:borrowTool
}