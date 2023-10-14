import { Worker } from 'worker_threads'

function runService(workerData,file) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(file, { workerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) return reject(new Error(`Worker stopped with exit code ${code}`))
      })
    })
  }
  
const result = await runService({teste:'ddd'},'./src/works/script.js')
 console.log(result);



