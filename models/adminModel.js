const  mongoose  = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/BRE';
mongoose.connect(url);

// ตรวจสอบการเชื่อมต่อ
const db = mongoose.connection;
db.once('open', () => {
    console.log('admin adaptor connect :', url);
})

db.on('error', (err) => {
    console.error('connection error T_T :', err);
})

const adminSchema = new mongoose.Schema({//collection record ของนักศึกษา... ทำกิจกรรม... เเล้ว เพื่อให้ง่ายต่อการ searching
    username:{ type: String, lowercase: true, trim: true, required: true },
    password:{ type: String, lowercase: true, trim: true, required: true }
})

module.exports = mongoose.model('admins', adminSchema);
//ตัวสร้าง schema ไว้เชื่อต่อ database