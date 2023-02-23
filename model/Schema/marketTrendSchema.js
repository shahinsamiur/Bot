
const mongoose=require("mongoose")



const TradeSchema=new mongoose.Schema({
Pair:String,
Trend:String
})


module.exports=TradeSchema;
