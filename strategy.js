
const MakeEmail = require("./Middlewares/MaleEmail");// this is for send mail to our users 
const AtrStopLossAndTakeProfit = require("./Bot/AtrStopLossAndTakeProfit");// this function calculate stop_loss 
const ema = require("./ema");// this function calculate ema 
const LotCalculate=require("./Bot/LotCalculate")// this function calculate lot data SL TP or returns false 
const fs = require("fs");
const pythoncallfunc = require("./Middlewares/pythoncallfunc");// this function call "data.py" for candle data  
const checkCloseTrade = require("./Middlewares/checkCloseTrade");// this function chack is opend trade close or not 
const EMA_100=require("./Middlewares/100EMA")
const py_call_fun_openTrade=require("./Middlewares/py_call_fun_openTrade.js");


const Strategy = async () => {
  var pairs = ["EURUSD","GBPUSD","AUDUSD","USDJPY","USDCAD"]; // this pair need for getting candle data 
  var trend = "";
  var SLandTP = {};
  var candleDataRaw;
var is_trade=false

  for (i = 0; i < pairs.length; i++) { // runing  a loop on pairs 
    try {
// we are getting candle data using python libery "Tvdatafeed" 

      candleDataRaw = await pythoncallfunc(pairs[i]);
      var output = await JSON.parse(candleDataRaw);
   
  // console.log("current price :",output.close[output.close.length-1])





// .........................................................................................


  // calling here ema function for calculate ema , using node.js libery "technicalindicators"
      const EMA21 = await ema(output.close, 21);
      const EMA50 = await ema(output.close, 50);
   
  //  console.log("EMA21",EMA21)
  //  console.log("EMA50",EMA50)

//    SLandTP = AtrStopLossAndTakeProfit(
//     output.close,
//     output.high,
//     output.low,
//     14,// pried 
//     "RMA",// type 
//     0.88 // multiplyer 
//   );
// console.log(SLandTP)


// here we are getting data from PDB to check if in that pair any trade is running or not 
      const isOpenTradeRaw = fs.readFileSync("./Bot/PDB/openTrade.json", "utf8");
      const isOpenTradeJson = JSON.parse(isOpenTradeRaw);





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
       
        // console.log("from if")
        var TrendData = PrevTrand;
        
// here we are updating trend of that pair 
        TrendData[i].treand = trend;
        var modifiedJsonData = JSON.stringify(TrendData);
        fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);


   // we set a logic here to check any trade is open or not in that pair 
   if (isOpenTradeJson[i].isTradeOpen) {
    console.log("we are going to check open trade  here ")  
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

if(!check_Close_Trade_Result){
  console.log("we are going to continue ",check_Close_Trade_Result)
  continue}
    }




// now we are checking higher timeframe for open trade and calculating ema 
          //  const EMA_100_Data= await EMA_100(output.close, 100)
        
      // console.log("EMA_100 100==",EMA_100_Data)


// now calculating stop loss point 
      SLandTP = AtrStopLossAndTakeProfit(
        output.close,
        output.high,
        output.low,
        14,// pried 
        "RMA",// type 
        1.5 // multiplyer 
      );

// here we set a logic for findout the trend of higher timeframe

        // if (trend== "up"&&output.close[output.close.length-1]>=EMA_100_Data[0]&&SLandTP.short[SLandTP.short.length-1]<EMA_100_Data[0]) {
        //   console.log("logic if ")
        //   is_trade=true
        // } else if (trend== "down"&&output.close[output.close.length-1]<=EMA_100_Data[0]&&SLandTP.long[SLandTP.long.length-1]>=EMA_100_Data[0]) {
        //   is_trade=true
        //   console.log("logic else if ")
        // } else {
        //   is_trade=false
        //   console.log("logic else ")
        //   console.log("current price=",output.close[output.close.length-1]," trend= ",trend," EMA_100= ",EMA_100_Data[0]," short= ",SLandTP.short[SLandTP.short.length-1]," long= ",SLandTP.long[SLandTP.long.length-1])
        // }



// finally we are checking that if higher timeframe trend is sweetable for opening trade  
        // if (is_trade) {


// here we are calculating lot size . and the "LotCalculate" function gives us stop_loss as SL , take_profit as TP and lotsize 
// else if the position not satisfied , that mean if sl size is more then set pips then it retuns "false"
const LotSize = await LotCalculate(
          output.close[output.close.length - 1],
          SLandTP,
          trend
        );
        
     
        console.log(LotSize);
    if(LotSize){
      py_call_fun_openTrade(trend,LotSize.SL,output.close[output.close.length - 1], pairs[i])
    }
//************************************************* */













// here we are checking if it returns data then we mail users or we will open trade here 
        if (LotSize) {
          await MakeEmail(
            pairs[i],
            trend,
            LotSize.SL,
            LotSize.TP,
            output.close[output.close.length - 1], );
// console.warn("mail send ")




// here we are updating "openTrade.json" file which is prevent to open a trade if trade open in that pair 





        }  
      // }


  



      } else if ( // this block is a part of treand identifing , above code was in if block and it is else if block  
        trend != "sideways" &&
        PrevTrand != {} &&
        PrevTrand[i].treand != trend
      ) {
  
  // In this block , if trand change but we are not going to open trade so we come here ...
        var TrendData = PrevTrand;
        // console.log(TrendData[i], "trendData","if else");
        TrendData[i].treand = trend;

        // here updating treand.json file 
        var modifiedJsonData = JSON.stringify(TrendData);
        fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);

      } 
      else {
 console.log("from else sure ")

// checking here for any open trade is closed or not 

        checkCloseTrade(output.high[output.high.length-1],
          output.low[output.low.length-1],
          isOpenTradeJson[i].SL,
          isOpenTradeJson[i].TP,
          isOpenTradeJson[i].type,
          i
          )

      }

    } catch (error) {// it is a part of try and catch 
      console.log(error);
    }
  }
};
module.exports = Strategy;
