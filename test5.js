const tools = require('./models/toolsModel.js');



tools.findOneAndUpdate({amount:999},{amount:50},(err,data)=>{
    if(err) console.log(err);
    else console.log(data);
});