function getATRStopLossLevels(close, high, low, length = 14, smoothing = "RMA", m = 1.5) {
    function rma(source, length) {
      let sum = 0.0
      for (let i = 0; i < length; i++) {
        sum += source[source.length - 1 - i]
      }
      return sum / length
    }
  
    function sma(source, length) {
      let sum = 0.0
      for (let i = 0; i < length; i++) {
        sum += source[source.length - 1 - i]
      }
      return sum / length
    }
  
    function ema(source, length) {
      const alpha = 2 / (length + 1)
      let ema = source[source.length - 1]
      for (let i = source.length - 2; i >= 0; i--) {
        ema = alpha * source[i] + (1 - alpha) * ema
      }
      return ema
    }
  
    function wma(source, length) {
      let sum = 0.0
      let weightSum = 0.0
      for (let i = 0; i < length; i++) {
        const weight = length - i
        sum += weight * source[source.length - 1 - i]
        weightSum += weight
      }
      return sum / weightSum
    }
  
    function maFunction(source, length) {
      if (smoothing === "RMA") {
        return rma(source, length)
      } else if (smoothing === "SMA") {
        return sma(source, length)
      } else if (smoothing === "EMA") {
        return ema(source, length)
      } else if (smoothing === "WMA") {
        return wma(source, length)
      }
    }
  
    const trs = []
    for (let i = 1; i < high.length; i++) {
      const trueRange = Math.max(
        high[i] - low[i],
        Math.abs(high[i] - close[i - 1]),
        Math.abs(low[i] - close[i - 1])
      )
      trs.push(trueRange)
    }
    const atr = maFunction(trs, length) * m
    const longLevels = high.map((h) => h + atr)
    const shortLevels = low.map((l) => l - atr)
    const output = {
      long: longLevels.join(","),
      short: shortLevels.join(","),
    }
    const result = {
        long: output.long.split(',').map(Number),
        short: output.short.split(',').map(Number)
      };
    return result
  }
  
  
  const close = [
    1.05438, 1.05443,
    1.05447, 1.05444,
    1.05458, 1.0549,
    1.05472, 1.05414,
    1.05414, 1.054305,   1.05438, 1.05443,
    1.05447, 1.05444,
    1.05458, 1.0549,
    1.05472, 1.05414,
    1.05414, 1.054305
  ];
  
  const high = [
    1.05464, 1.0546,
    1.05482, 1.0546,
    1.05474, 1.05494,
    1.05508, 1.05482,
    1.05432, 1.054305, 1.05464, 1.0546,
    1.05482, 1.0546,
    1.05474, 1.05494,
    1.05508, 1.05482,
    1.05432, 1.054305
  ];
  
  const low = [
    1.05399, 1.05433,
    1.05434, 1.05438,
    1.05442, 1.05453,
    1.05467, 1.05402,
    1.05402, 1.05402, 1.05464, 1.0546,
    1.05482, 1.0546,
    1.05474, 1.05494,
    1.05508, 1.05482,
    1.05432, 1.054305
  ];
  
  const result = getATRStopLossLevels(close,high, low, 14, "RMA", 1.5);
  console.log(result);
  