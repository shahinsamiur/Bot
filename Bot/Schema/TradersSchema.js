
const mongoose =require("mongoose")

const Traders=new mongoose.Schema({
    UsersBrokersAccount:String
})


module.exports=Traders