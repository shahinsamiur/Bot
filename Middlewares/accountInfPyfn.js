

const { spawn } = require('child_process');

function accountInfPyfn(toekn) {

const UserAccountToken=toekn
// console.log("hmm",pairForData)
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ['./Bot/python/getAccountInfo.py',UserAccountToken]);
  
      let datas = '';
      pythonProcess.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
        datas += data.toString();
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
module.exports=accountInfPyfn  
