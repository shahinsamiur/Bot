const { PythonShell } = require("python-shell");
const DotEnv = require("dotenv").config();
const MakeEmail = require("./Middlewares/MaleEmail");
const AtrStopLossAndTakeProfit = require("./Bot/AtrStopLossAndTakeProfit");
const ema = require("./ema");
const LotCalculate=require("./Bot/LotCalculate")
const OpenTrade = require("./Bot/OpenTrade");
const fs = require("fs");
const pythoncallfunc = require("./Middlewares/pythoncallfunc");
const checkCloseTrade = require("./Middlewares/checkCloseTrade");
// const dd = require("./Bot/PDB/treand.json");
const Strategy = async () => {
  var pairs = ["EURUSD", "USDJPY", "GBPUSD", "AUDUSD", "USDCAD"];
  var pairsForPython = ["EUR/USD", "USD/JPY", "GBP/USD", "AUD/USD", "USD/CAD"];

  var trend = "";

  var SLandTP = {};

  var candleDataRaw;

  for (i = 0; i < pairs.length; i++) {
    try {
      candleDataRaw = await pythoncallfunc(pairs[i]);
      var output = await JSON.parse(candleDataRaw);

      const EMA21 = await ema(output.close, 7);
      const EMA50 = await ema(output.close, 21);

      if (EMA21[0] > EMA21[1] && EMA21[0] > EMA50[0]) {
        trend = "up";
        console.log(pairs[i], "up");
      } else if (EMA21[0] < EMA21[1] && EMA21[0] < EMA50[0]) {
        trend = "down";
        console.log(pairs[i], "down");
      } else {
        trend = "sideways";
        console.log(pairs[i], "sideways");
      }

      const jsonData = fs.readFileSync("./Bot/PDB/treand.json", "utf8");
      const PrevTrand = JSON.parse(jsonData);
      // console.log("prevtrend got ", PrevTrand[i]);
      if (
        trend != "sideways" &&
        PrevTrand != {} &&
        PrevTrand[i].treand != trend &&
        PrevTrand[i].treand != "sideways"
      ) {
        var TrendData = PrevTrand;
        console.log(TrendData[i], "trendData","if");
        TrendData[i].treand = trend;
        var modifiedJsonData = JSON.stringify(TrendData);
        fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);

        const EMA211H = await ema(output.close1H, 21);
        const EMA501H = await ema(output.close1H, 50);
        var trend1H = "";
        if (EMA211H[0] > EMA211H[1] && EMA211H[0] > EMA501H[0]) {
          trend1H = "up";
          console.log("up_5min");
        } else if (EMA211H[0] < EMA211H[1] && EMA211H[0] < EMA501H[0]) {
          trend1H = "down";
          console.log("down_5min");
        } else {
          trend1H = "sideways";
          console.log("sideways_5min");
        }

        if (trend1H == "sideways" || trend1H == trend) {
          SLandTP = await AtrStopLossAndTakeProfit(
            output.close,
            output.high,
            output.low,
            14,
            "RMA",
            1.5
          );
        }
        //---------------------------------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------------------------------

        // const LotSize=await LotCalculate(userBlance,currentPrice,SLandTP2,signal)
        var userBlance=100;
        const LotSize = await LotCalculate(
          userBlance,
          output.close[output.close.length - 2],
          SLandTP,
          trend
        );
        console.log(LotSize);
        if (LotSize) {
          await MakeEmail(
            pairs[i],
            trend,
            LotSize.riskPrice,
            output.close[output.close.length - 2]
          );
        }
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
