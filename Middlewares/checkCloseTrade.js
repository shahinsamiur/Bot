
const fs=require('fs')
const check_Close_Trade = (high , low ,SL,TP,type,i) => {


// we are getting data from PDM to modify openTrade.json
    const is_Open_Trade_Raw = fs.readFileSync("../Bot/PDB/openTrade.json", "utf8");
    const is_Open_Trade_Json = JSON.parse(is_Open_Trade_Raw);

    var New_Json=is_Open_Trade_Json

if(type=="buy"){
    if(TP<=high||SL>=low) {
        // logic for  Trade close 
        New_Json[i].isTradeOpen=false
        New_Json[i].SL=""
        New_Json[i].TP=""
        New_Json[i].type=""
        fs.writeFileSync("../Bot/PDB/openTrade.json", New_Json);
        return true
    }else{
   // logic for Trade open so we return continue 
     return false
    }
}else{
    if(TP>=low||SL<=high) {
         // logic for  Trade close 

        New_Json[i].isTradeOpen=false
        New_Json[i].SL=""
        New_Json[i].TP=""
        New_Json[i].type=""
        fs.writeFileSync("../Bot/PDB/openTrade.json", New_Json);


        return true
    }else{
   // logic for Trade open so we return continue 
    return false
    }
}



};

module.exports = check_Close_Trade;
