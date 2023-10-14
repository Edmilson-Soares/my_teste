import { Queue, Worker} from 'bullmq'

const queue=({name})=>{
    const myQueue = new Queue(name, { connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    }});
    return {
       async add(name,data){
            await myQueue.add(name,data);
        }
    }
}

const worker=({
    name,
    fn,
    completed=job => {
        console.log(`${job.id} has completed!`);
    },
    failed=(job, err) => {
        console.log(`${job.id} has failed with ${err.message}`);
    }

})=>{
    const myWorker = new Worker(name,fn, { connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
      }});
      myWorker.on('completed', completed);
      myWorker.on('failed', failed);
    
}
export {
    queue,
    worker

}