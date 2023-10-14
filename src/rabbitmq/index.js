import rabbitmq from "./client.js";

await rabbitmq.start()

//await rabbitmq.send('test','ddd')


await rabbitmq.publisher({exchangeName:'my-topic',exchangeType:'topic'},{name:'ddd'})

await rabbitmq.consume({queue:'test',exchangeName:'my-topic',exchangeType:'topic'},({data,ack})=>{
    console.log(data)
    ack()
})