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

/************************************
 * 
 * @param {*} userid id ของ user 
 * @param {*} toolid id ของ ของ
 * @param {*} amount จำนวนที่ยืมไป
 * @returns null
 * @author norapat
 * 
 * step ในการ borrow
 * get ของนั้นๆ ใน stock มาเก็ในตัวเเปร
 * update ค่าในตัวเเปร ตามจำนวนที่ยืม
 * เอาค่าในตัวเเปรไป update จำนวน นั้นๆ ใน stock
 * get ของทั้งหมดที่ user นั้นๆ มีมาเก็บในตัวเเปร
 * update ค่าในตัวเเปร
 * เอาค่่าในตัวเเปรไป update ในของทั้งหมดที่ user นั้นมี
 * มีเเค่ 6 ขั้นตอนง่ายๆ เหมือนกระสุนลูกโม่ ยิงใส่ programmer 
 * 
 ************************************/
function borrowTool(userid, toolid, amount) {
    return new Promise((resolve, reject) => {
        
    })
}

module.exports = {
    gettools: gettools,
    borrowTool: borrowTool
}