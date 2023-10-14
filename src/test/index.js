import { Queue, Worker} from 'bullmq'

// Create a new connection in every instance
const myQueue = new Queue('foo', { connection: {
    host: '127.0.0.1',
    port: 6379,
    password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
}});

const myWorker = new Worker('foo', async (job)=>{

    console.log(job.data);

}, { connection: {
    host: '127.0.0.1',
    port: 6379,
    password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
  }});



  myWorker.on('completed', job => {
    console.log(`${job.id} has completed!`);
  });
  
  myWorker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
  });

async function addJobs() {
  await myQueue.add('myJobName', { foo: 'bar' });
  await myQueue.add('myJobName', { qux: 'baz' });
}

await addJobs()

