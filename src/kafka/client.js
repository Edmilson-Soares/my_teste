import { tryCatch } from 'bullmq'
import { Kafka } from 'kafkajs'

export default async ({clientId,brokers,groupId})=> {

    const kafka = new Kafka({
        clientId,brokers
      })
      
    const producer = kafka.producer()
   const consumer = kafka.consumer({ groupId })
   await consumer.connect()
   await producer.connect()
   return {

   async subscribe(topic,fn){

    await consumer.subscribe({ topic, fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        let input=message.value.toString()
        try {
            input=JSON.parse(input)
        } catch (error) {
            
        }
        await fn({topic,partition,message,input})
      },
    })

    },

    async send(topic,data){

        if(Array.isArray(data)){

            return  await producer.send({
                topic,
                messages:data.map(value=>{
                    if(typeof value=='object'){
                        return {value:JSON.stringify(value)}
                    }
                    return {value}
                }),
              })
        }else{
          let value=data
            if(typeof value=='object'){
                value=JSON.stringify(value)
            }
            
          return  await producer.send({
                topic,
                messages:[{value}],
              })
        }

    }

   }

}