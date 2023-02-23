
const mongoose=require("mongoose")
const Trade=require("../../model/Schema/marketTrendSchema")

const model=new mongoose.model("Trade",Trade)

module.exports=model;