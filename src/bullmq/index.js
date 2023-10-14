import env from 'dotenv'
env.config()


import {queue,worker} from './bullmq/job.js'

await worker({
    name:'test',
    fn:(job)=>{
        console.log(job.data)
    }
})


await queue({name:'test'}).add('name',{text:'ddd'})


