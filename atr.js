const atr = (high, low, close, length) => {
    console.log("sdfasd")
    let tr = [];
    for (let i = 0; i < length; i++) {
      tr[i] = Math.max(
        high[i] - low[i],
        Math.abs(high[i] - close[i - 1]),
        Math.abs(low[i] - close[i - 1])
      );
    }
    let atr = sma(tr, length);
    return atr;  };
  
  const sma = (values, period) => {
    let sum = 0;
    for (let i = 0; i < period; i++) {
      sum += values[i];
    }
    let sma = sum / period;
    return sma;
  };
  
  const rma = (values, period) => {
    let rma = sma(values, period);
    for (let i = period; i < values.length; i++) {
      rma = (rma * (period - 1) + values[i]) / period;
    }
    return rma;
  };
  
  const ema = (values, period) => {
    let ema = sma(values.slice(0, period), period);
    let multiplier = 2 / (period + 1);
    for (let i = period; i < values.length; i++) {
      ema = (values[i] - ema) * multiplier + ema;
    }
    return ema;
  };
  
  const wma = (values, period) => {
    let sum = 0;
    let divisor = 0;
    for (let i = 0; i < period; i++) {
      sum += values[i] * (period - i);
      divisor += (period - i);
    }
    let wma = sum / divisor;
    return wma;
  };
  
  const ma = (values, length, smoothing) => {
    if (smoothing === "RMA") {
      return rma(values, length);
    } else if (smoothing === "SMA") {
      return sma(values, length);
    } else if (smoothing === "EMA") {
      return ema(values, length);
    } else {
      return wma(values, length);
    }
  };
  
  const stopLoss = (high, low, length, smoothing, multiplier) => {
    let atrValue = atr(high, low, close, length) * multiplier;
    let atrHigh = ma(high, length, smoothing) + atrValue;
    let atrLow = ma(low, length, smoothing) - atrValue;
    console.log( atrValue, atrHigh, atrLow )
  };
  





atr(134.887,134.776,134.869,1.5)



