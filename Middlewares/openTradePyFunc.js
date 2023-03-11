
const { spawn } = require('child_process');

function runPythonScript(pair,SL,lotSize,TP,signal,token) {


    return new Promise(async(resolve, reject) => {
      const pythonProcess = spawn('python', ['./Bot/python/openTrade.py',pair,SL,lotSize,TP,signal,token]);
  
      let datas = '';
      pythonProcess.stdout.on('data', async(data) => {
        // console.log(`stdout: ${data}`);
        datas +=await data.toString();
        resolve(datas)
      });
  
      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
  
      pythonProcess.on('close', (code) => {
        // console.log(`child process exited with code ${code}`);
        if (code === 0) {
          resolve(datas); // Resolve the promise with datas value
        } else {
          reject(`child process exited with code ${code}`);
        }
      });
    });
  }
module.exports=runPythonScript  


