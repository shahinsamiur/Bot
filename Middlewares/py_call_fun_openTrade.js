

const { spawn } = require("child_process");

function runPythonScript(signal,SL,currentPrice,pair) {
    
  console.log(signal);
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      "./Bot/python/open_trade.py",
      signal,SL,currentPrice,pair
    ]);

    let datas = "";
    pythonProcess.stdout.on("data", (data) => {

      datas += data;
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {

      if (code === 0) {
        console.log(datas)
        resolve(datas); // Resolve the promise with datas value
      } else {
        reject(`child process exited with code ${code}`);
      }
    });
  });
}
module.exports = runPythonScript;
