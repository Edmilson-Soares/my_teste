
import { workerData, parentPort } from 'worker_threads'

console.log('id',process.pid)



console.log('dddd')
// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
parentPort.postMessage({ hello: workerData })