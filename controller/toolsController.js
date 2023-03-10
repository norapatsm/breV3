const tools = require("../models/toolsModel.js");
const getusers = require('./user_controller.js').getUsers;
/**ถ้าจะ get id ต้อง { _id: session.userid } */

function gettools(in_json) {
    return new Promise((resolve, reject) => {
        tools.find(in_json, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

/**
 * 
 * @param {*} userid id ของ user 
 * @param {*} toolid id ของ ของ
 * @param {*} amount 
 * @returns 
 * 
 */

function borrowTool(userid, toolid, amount) {
    return new Promise((resolve, reject) => {
        console.log("callfunction borrow with agrument",userid,toolid,amount);
        amount = Number(amount)
        let tooInStock;
        /**ดูว่ามีของเท่าไร */
        tools.findById(toolid, (err, data) => {
            if (err) reject(err);
            tooInStock = data.amount;
            console.log("tool in stock", data.amount);
        });
        /** ตัด stock */
        tooInStock -= amount;
        tools.findByIdAndUpdate(userid, { amount: tooInStock }, (err, data) => {
            if (err) reject(err);
            console.log("resault ตัด sotck",data);
        });
        /**เรียกข้อมูลว่า user มีของอะไรเท่าไร */
        let user_have={};
        users.findById(userid, (err, data) => {
            if (err) reject(err);
            user_have = data.borrowed;
        })
        /**เพิ่มของใน dbของที่ user ยืมอยู่
         * {id_ของ : จำนวนของ}
         * จากรูปเเบบดังกล่าว ทำให้ต้อง check ก่อน ว่ามี key id อยู่มั้ย
         * ถ้ามี เเสดงว่าเคยยืมเเล้ว เเล้วจะยืมเพิ่ม ให้บวกค่าเพิ่ม
         * ถ้าไม่มี เเสดงว่าพึ่งจะยืม ให้สร้าง key เเละ assign value
        */
        if(toolid in user_have){/**ถ้า user ยืมของนั้นอยู่เเล้วจะยืมเพิ่ม */
            user_have[toolid] += amount; /**ยืมของเพ่ิมเท่าไรก็ยวกค่าเข้าไป */
        }else{
            /**ถ้ายังไม่เคยยืมของนั้นมาก่อน */
            user_have[toolid] = amount;
        }
        /**เอาของที่ user มีในตอนนี้ ที่อยุ่ในตัวเเปรไป update ใน database */
        users.findByIdAndUpdate(userid,{borrowed:user_have},(err,olddata)=>{
            if(err){
                reject(err);
            }else{
                resolve(olddata);/**data after update */
            }
        });
    })
}

module.exports = {
    gettools: gettools,
    borrowTool: borrowTool
}