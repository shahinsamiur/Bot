
const MakeEmail = require("./Middlewares/MaleEmail");
const AtrStopLossAndTakeProfit = require("./Bot/AtrStopLossAndTakeProfit");
const ema = require("./ema");
const LotCalculate=require("./Bot/LotCalculate")
const fs = require("fs");
const pythoncallfunc = require("./Middlewares/pythoncallfunc");
const checkCloseTrade = require("./Middlewares/checkCloseTrade");




const Strategy = async () => {
  var pairs = ["EURUSD", "USDJPY", "GBPUSD", "AUDUSD", "USDCAD"];
  var trend = "";
  var SLandTP = {};
  var candleDataRaw;


  for (i = 0; i < pairs.length; i++) {
    try {
// we are getting candle data using python libery "Tvdatafeed" 

      candleDataRaw = await pythoncallfunc(pairs[i]);
      var output = await JSON.parse(candleDataRaw);
  

  // calling here ema function for calculate ema , using node.js libery "technicalindicators"
      const EMA21 = await ema(output.close, 21);
      const EMA50 = await ema(output.close, 50);
   


// here we are getting data from PDB to check if in that pair any trade is running or not 
      const isOpenTradeRaw = fs.readFileSync("./Bot/PDB/openTrade.json", "utf8");
      const isOpenTradeJson = JSON.parse(isOpenTradeRaw);


      // we set a logic here to check any trade is open or not in that pair 
      if (isOpenTradeJson[i].isTradeOpen) {

      const check_Close_Trade_Result=checkCloseTrade(output.high[output.high.length-1],
        output.low[output.low.length-1],
        isOpenTradeJson[i].SL,
        isOpenTradeJson[i].TP,
        isOpenTradeJson[i].type,
        i
        )

// "check_Close_Trade_Result" function returns boolean value.
// it gives us true if there is no trade open otherwise  false 

// if function returns false that means trade open in that pair so here skiping the loop by "continue" 
          if(!check_Close_Trade_Result) continue
      }







// here we are implementing technical logic here 

      if (EMA21[0] > EMA21[1] && EMA21[0] > EMA50[0]) {
        trend = "up";
       
      } else if (EMA21[0] < EMA21[1] && EMA21[0] < EMA50[0]) {
        trend = "down";
      
      } else {
        trend = "sideways";
     
      }


      // here we are getting data from  PBD  to check if market trand is same as previous treand 
      const jsonData = fs.readFileSync("./Bot/PDB/treand.json", "utf8");
      const PrevTrand = JSON.parse(jsonData);
      

// here we set our logic to open trade that means our low timeframe gives signal for trade 
      if (
        trend != "sideways" &&
        PrevTrand != {} &&
        PrevTrand[i].treand != trend &&
        PrevTrand[i].treand != "sideways"
      ) {
        var TrendData = PrevTrand;
        
// here we are updating trend of that pair 
        TrendData[i].treand = trend;
        var modifiedJsonData = JSON.stringify(TrendData);
        fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);


// now we are checking higher timeframe for open trade and calculating ema 
        const EMA211H = await ema(output.close1H, 21);
        const EMA501H = await ema(output.close1H, 50);
      
        var trend1H = "";// that variable store higher timeframe trend 

// here we set a logic for findout the trend of higher timeframe 
        if (EMA211H[0] > EMA211H[1] && EMA211H[0] > EMA501H[0]) {
          trend1H = "up";
        } else if (EMA211H[0] < EMA211H[1] && EMA211H[0] < EMA501H[0]) {
          trend1H = "down";
        } else {
          trend1H = "sideways";
        }



// finally we are checking that if higher timeframe trend is sweetable for opening trade  
        if (trend1H == "sideways" || trend1H == trend) {

// now calculating stop loss point 
          SLandTP = await AtrStopLossAndTakeProfit(
            output.close,
            output.high,
            output.low,
            14,// pried 
            "RMA",// type 
            1.5 // multiplyer 
          );
  



// here we are calculating lot size considering stop loss , it just for testing perpose
        var userBlance=100;


//.........................................................................................
        const LotSize = await LotCalculate(
          userBlance,
          output.close[output.close.length - 1],
          SLandTP,
          trend
        );
        var time=new Date().getMinutes()
        console.log(time)
        console.log(LotSize);
        
        if (LotSize) {
          await MakeEmail(
            pairs[i],
            trend,
            LotSize.SL,
            LotSize.TP,
            output.close[output.close.length - 1],
           
          );
        }  }
      } else if (
        trend != "sideways" &&
        PrevTrand != {} &&
        PrevTrand[i].treand != trend
      ) {
        var TrendData = PrevTrand;
        console.log(TrendData[i], "trendData","if else");
        TrendData[i].treand = trend;
        var modifiedJsonData = JSON.stringify(TrendData);
        fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);
      } else {
        // console.log("re check the code ");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = Strategy;
