const { PythonShell } = require("python-shell");
const DotEnv = require("dotenv").config();
const MakeEmail = require("./Middlewares/MaleEmail");
const AtrStopLossAndTakeProfit = require("./Bot/AtrStopLossAndTakeProfit");
const ema = require("./ema");
const OpenTrade = require("./Bot/OpenTrade");
const fs = require("fs");
const pythoncallfunc = require("./Middlewares/pythoncallfunc");
const checkCloseTrade = require("./Middlewares/checkCloseTrade");
const dd = require("./Bot/PDB/treand.json");
const Strategy = async () => {
  var pairs = ["BTCUSDT", "ETHUSDT", "MATICUSDT", "XRPUSDT", "APTUSDT","KAVAUSDT"];
  var pairsForPython = ["EUR/USD", "USD/JPY", "GBP/USD", "AUD/USD", "USD/CAD"];

  var trend = "";
  for (i = 0; i < pairs.length; i++) {
    console.log(i);
    const candleDataRaw = await pythoncallfunc(pairs[i]);
    var output = await JSON.parse(candleDataRaw);

    const EMA21 = await ema(output.close, 21);
    const EMA50 = await ema(output.close, 50);
    // console.log("ema's got ");

    if (EMA21[0] > EMA21[1] && EMA21[0] > EMA50[0]) {
      trend = "up";
      console.log("up");
    } else if (EMA21[0] < EMA21[1] && EMA21[0] < EMA50[0]) {
      trend = "down";
      console.log("down");
    } else {
      trend = "sideways";
      console.log("sideways");
    }

    const jsonData = fs.readFileSync("./Bot/PDB/treand.json", "utf8");
    const PrevTrand = JSON.parse(jsonData);
    // console.log(PrevTrand[i].treand)
    // PrevTrand[i].treand = trend;
    console.log(PrevTrand[i])

    if (
      trend != "sideways" &&
      PrevTrand != {} &&
      PrevTrand[i].treand != trend &&
      PrevTrand[i].treand != "sideways"
    ) {
      var TrendData = PrevTrand;
      console.log("sas", 1);
      console.log(TrendData);
      TrendData[0].treand = "UP";
      var modifiedJsonData = JSON.stringify(TrendData);
      fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);
      // console.log(ala)
      // PrevTrand[i]=
      // fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);

      const EMA211H = await ema(output.close1H, 21);
      const EMA501H = await ema(output.close1H, 50);
      var trend1H = "";
      if (EMA211H[0] > EMA211H[1] && EMA211H[0] > EMA501H[0]) {
        trend1H = "up";
        console.log("up_1h");
      } else if (EMA211H[0] < EMA211H[1] && EMA211H[0] < EMA501H[0]) {
        trend1H = "down";
        console.log("down_1H");
      } else {
        trend1H = "sideways";
        console.log("sideways_1h");
      }

      if (trend1H == "sideways" || trend1H == trend) {
        var SLandTP = await AtrStopLossAndTakeProfit(
          output.close,
          output.high,
          output.low,
          14,
          "RMA",
          1.5
        );
        console.log(SLandTP.long[70], SLandTP.short[70]);

        //---------------------------------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------------------------------

        // await MakeEmail(pairs[i],EMA21.values[0].ema)

        // check any trade is open in this pair ?

        // console.log("let's open a trede ")

        // await OpenTrade(pairsForPython[i],SLandTP,output.close[output.close.length-2],trend)
        // console.log("trade Opend ")

        const jsonData = fs.readFileSync("./Bot/PDB/openTrade.json", "utf8");
        const OpenTradePair = JSON.parse(jsonData);

        // console.log("checking")

        if (
          OpenTradePair[i].pair == pairs[i] &&
          OpenTradePair[i].isTradeOpen == false
        ) {
          var OrderId = await OpenTrade(
            pairsForPython[i],
            SLandTP,
            output.close[output.close.length - 2],
            trend
          );
          console.log(OrderId);

          // const modifiedJsonDataOfPairsTrade = JSON.stringify(OpenTradePair);
          // fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonDataOfPairsTrade);
        } else {
          console.log("sas", 2);
          checkCloseTrade();
        }

        //  OpenTrade(pairsForPython[i],SLandTP,output.close[output.close.length-2],trend)

        //   OpenTradePair[i].treand =trend;
        //   console.log(OpenTradePair)
        // const modifiedJsonData = JSON.stringify(PrevTrand);
        // await fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);
      }
    } else if (
      trend != "sideways" &&
      PrevTrand != {} &&
      PrevTrand[i].treand != trend
    ) {
      // check is trade close or not

      var TrendData = PrevTrand;
      console.log(TrendData);
      console.log("sas", 2);
      TrendData[i].treand = trend;
      var modifiedJsonData = JSON.stringify(TrendData);
      fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);
    }else{
      console.log("hellow world ")
    }
  }
};
module.exports = Strategy;
