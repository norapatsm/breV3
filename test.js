const events=require('./models/eventModel.js');
events.find({},(err,data)=>{
    if(err){
        console.log("error");
    }else{
        console.log(data);
    }
});