import Queue from 'bull';

const job = {
    key: 'teste1',
    options: {
        //delay: 5000,
    },
    handle({ data, reject }, done) {

        // reject(data)
        console.log(data, reject, 'ddd');
        //done(new Error('ddd'))
       // throw new Error('dd')
            //done()
    },
};

const queue = new Queue(job.key, {
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
    }

})

queue.process(job.handle);


queue.add({ i: 'ddd' }, {
    attempts: 1,
    // repeat: { cron: '* * * * * *' }
});


queue.on('global:completed', jobId => {
    console.log(`Job with id ${jobId} has been completed`);
})

queue.on('failed', (job1, err) => {

   // job1.data.Error = job1.data.Error ? job1.data.Error + 1 : 0

    console.log('Job failed', job.key, job1.data, err);

});


queue.on('completed', function(job, result) {
    // Job completed with output result!

    console.log('dd')
})