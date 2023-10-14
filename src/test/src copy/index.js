import { Kafka } from 'kafkajs'
import ip from 'ip'

const host = process.env.HOST_IP || ip.address()

console.log(`${host}:9092`)

const kafka = new Kafka({
  clientId: 'tttttt',
  brokers: [`${host}:9092`],
})


const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Producing
  await producer.connect()


  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })

/*

 setInterval(async() => {

   await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
    
   
 }, 300);
 */
}

run().catch(console.error)
