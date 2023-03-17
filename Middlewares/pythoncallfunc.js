// const { spawn } = require('child_process');

// const pythonProcess = spawn('python', ['./Bot/python/data.py','hello samiur',"notthing "]);

// getting candle data

const { spawn } = require("child_process");

function runPythonScript(pair) {
  const pairForData = pair;
  console.log(pairForData);
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      "./Bot/python/data.py",
      pairForData,
    ]);

    let datas = "";
    pythonProcess.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
      datas += data;
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      if (code === 0) {
        resolve(datas); // Resolve the promise with datas value
      } else {
        reject(`child process exited with code ${code}`);
      }
    });
  });
}
module.exports = runPythonScript;
