
import { createClient } from 'redis';
let client = {}

export default {
   async connect(){

    client= createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    });
    
    
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect()
    },
   async close(){
    await client.disconnect();
    },
   set:async (name,data)=>{
    let input=data
     if(typeof data=='object'){
       input=JSON.stringify(data)
     }
    return await client.set(name,input);
   } ,
   get:async(name)=>{
    const value = await client.get(name);
    try {
        return JSON.parse(value)
    } catch (error) {
        return value
    }
   }
}