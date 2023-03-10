const tools = require("../models/toolsModel.js");
const getusers = require('./user_controller.js').getUsers;
const updateUser = require('./user_controller.js').updateUser;
/**ถ้าจะ get id ต้อง { _id: session.userid } */

function gettools(in_json) {
    return new Promise((resolve, reject) => {
        tools.find(in_json, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function updatetool(filter,in_json){
    return new Promise((resolve, reject) => {
        tools.findOneAndUpdate(filter,in_json,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    })
}

/************************************
 * 
 * @param {*} userid id ของ user 
 * @param {*} toolid id ของ ของ
 * @param {*} amount จำนวนที่ยืมไป
 * @returns data after edit
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
    return new Promise(async (resolve, reject) => {
        let stock_have = (await gettools({ _id: toolid }))[0].amount;/**get จำนวนของ id นั้นๆ ใน stock */
        stock_have -= amount;
        await updatetool({ _id: toolid },{amount:stock_have});/** update ค่าใหม่ลง stock */
        let user_have = (await getusers({_id: userid}))[0].borrowed;
        if(toolid in user_have){/** update ตัวเเปร ของ ของที่ user คนนั้นๆ มี */
            user_have[toolid]+=amount;
        }else{
            user_have[toolid]=amount;
        }
        /** update ค่าลง database */
        await updateUser({_id:userid}, {borrowed:user_have});
        resolve(user_have); /**ส่งค่ากลับ */
    })
}

/**
 * 
 * @param {*} userid 
 * @returns จำนวนของในคลังล่าสุด
 * วิธีในการ คืนของคือ read ค่าใน database มา ใส่ตัวเเปร
 * เเล้วก็ update เพิ่มค่าในตัวเเปร
 * เอาค่าตัวเเปร update กลับไปใน database 
 * ลบของในตัวเราออกให้หมด
 */
function returnItem(userid){
    return new Promise(async (resolve, reject) => {
        let user_have = (await getusers({_id: userid}))[0].borrowed;
        for (let [toolid, amount] of Object.entries(user_have)) {/** forloop ผ่านของทุกตัวที่ user มี */
            let stock_have = (await gettools({ _id: toolid }))[0].amount;/**get จำนวนของ id นั้นๆ ใน stock */
            stock_have+=amount;/**update ค่าตัวเเปร ที่เป็นตัวเเทนของ จำนวนของใน data base */
            await updatetool({_id: toolid}, {amount:stock_have});
        }
        await updateUser({_id: userid}, {borrowed:{}});
        resolve();
    })
}

module.exports = {
    gettools,
    borrowTool,
    returnItem
}