
const mongoose =require("mongoose")
// const TradeSchema=require("../Bot/Schema/TradersSchema")
const MarketTrend=require("./Schema/marketTrendSchema")
const TradersModel=new mongoose.model("Traders",MarketTrend)

module.exports=TradersModel