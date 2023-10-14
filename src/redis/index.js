
import env from 'dotenv'
env.config()


import redis from './client.js'

await redis.connect()

await redis.set('key', {name:'ddd'})

const value=await redis.get('key')

console.log(value)

