const mongoose = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/BRE';// put your mongodb URL here
mongoose.connect(url);

// ตรวจสอบการเชื่อมต่อ
const db = mongoose.connection;
db.once('open', () => {
    console.log('tools adaptor connect :', url);
});

db.on('error', (err) => {
    console.error('connection error T_T :', err);
});

const toolSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, trim: true, required: true },
    amount: {type: Number, default: 0},
    photo_url :{type: String, default:"https://cdn-icons-png.flaticon.com/512/685/685388.png"}
});

module.exports = mongoose.model('tools', toolSchema);
//ตัวสร้าง schema ไว้เชื่อต่อ database