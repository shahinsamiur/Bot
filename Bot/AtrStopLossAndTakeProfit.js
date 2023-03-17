function getATRStopLossLevels(
  close,
  high,
  low,
  length = 14,
  smoothing = "RMA",
  m = 1.5
) {
  function rma(source, length) {
    let sum = 0.0;
    for (let i = 0; i < length; i++) {
      sum += source[source.length - 1 - i];
    }
    return sum / length;
  }

  function sma(source, length) {
    let sum = 0.0;
    for (let i = 0; i < length; i++) {
      sum += source[source.length - 1 - i];
    }
    return sum / length;
  }

  function ema(source, length) {
    const alpha = 2 / (length + 1);
    let ema = source[source.length - 1];
    for (let i = source.length - 2; i >= 0; i--) {
      ema = alpha * source[i] + (1 - alpha) * ema;
    }
    return ema;
  }

  function wma(source, length) {
    let sum = 0.0;
    let weightSum = 0.0;
    for (let i = 0; i < length; i++) {
      const weight = length - i;
      sum += weight * source[source.length - 1 - i];
      weightSum += weight;
    }
    return sum / weightSum;
  }

  function maFunction(source, length) {
    if (smoothing === "RMA") {
      return rma(source, length);
    } else if (smoothing === "SMA") {
      return sma(source, length);
    } else if (smoothing === "EMA") {
      return ema(source, length);
    } else if (smoothing === "WMA") {
      return wma(source, length);
    }
  }

  const trs = [];
  for (let i = 1; i < high.length; i++) {
    const trueRange = Math.max(
      high[i] - low[i],
      Math.abs(high[i] - close[i - 1]),
      Math.abs(low[i] - close[i - 1])
    );
    trs.push(trueRange);
  }
  const atr = maFunction(trs, length) * m;
  const longLevels = high.map((h) => h + atr);
  const shortLevels = low.map((l) => l - atr);
  const output = {
    long: longLevels.join(","),
    short: shortLevels.join(","),
  };

  const result = {
    long: output.long.split(",").map(Number),
    short: output.short.split(",").map(Number),
  };

  return result;
}

module.exports = getATRStopLossLevels;
