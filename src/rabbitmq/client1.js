const  amqplib = require('amqplib');

let client = {}
module.exports=  {
    async start(){
        client= await amqplib.connect(process.env.RABBITMQ_URL||'amqp://localhost');
        client = await client.createChannel();
     },
     async send(queue,data){
        let input=data
        await client.assertQueue(queue);
        if(typeof data=='object'){
            input=JSON.stringify(input)
        }
       return client.sendToQueue(queue, Buffer.from(input));
     },
     async publisher({routingKey='',exchangeName='my-topic',exchangeType='topic'},data){
        await client.assertExchange(exchangeName, exchangeType)
        let input=data
        if(typeof data=='object'){
            input=JSON.stringify(input)
        }

        return client.publish(
            exchangeName,
            routingKey,
            Buffer.from(input),
            {
               persistent: true
            }
        )
     },
    async consume({queue,exchangeName,pattern='',exchangeType},fn){
        await client.assertQueue(queue)
        if(exchangeName&&exchangeType){
            await client.assertExchange(exchangeName, exchangeType)
            await client.bindQueue(queue, exchangeName, pattern)
        }

        client.consume(queue,async (msg) => {
        
        if (msg !== null) {
            let input=msg.content.toString()
             try {
                input=JSON.parse(input)
             } catch (error) {
                
             }

             await fn({data:input,ack:()=>client.ack(msg)})
            //ch1.ack(msg);
          }


        })
     }

}