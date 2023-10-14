import ip from 'ip'
import env from 'dotenv'
env.config()


const host = process.env.HOST_IP || ip.address()
import kafka from './client.js'


const client=await kafka({
    clientId: 'tttttt',
    brokers: [`${'localhost'}:9092`],
    groupId: 'test-group'
})


await client.subscribe('test-topic',({topic,input})=>{console.log(topic,input)})



await client.send('test-topic',[{name:'ddd'},'ddddddddddddddddddddddd'])
