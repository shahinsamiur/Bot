
const mongoose =require("mongoose")
const TradeSchema=require("../Bot/Schema/TradersSchema")

const TradersModel=new mongoose.model("Traders",TradeSchema)

module.exports=TradersModel