/*import Queue from 'bull';


const job = {
    key: 'UserReport',
    options: {
        //delay: 5000,
    },
    async handle({ data }) {


        console.log(data);
    },
};

const queue = new Queue(job.key, {
    host: '127.0.0.1',
    port: 6379,
    auth_pass: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
})


queue.process(job.handle);

*/

import { createClient } from 'redis';

const client = createClient({
    host: '127.0.0.1',
    port: 6379,
    password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
});

client.on('error', err => console.log('Redis Client Error', err));
//client.auth("eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81");
await client.connect();

await client.set('key', 'value');
const value = await client.get('key');

console.log(value)
await client.disconnect();