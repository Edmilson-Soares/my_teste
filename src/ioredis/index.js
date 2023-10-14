import client from "./client.js";

import env from 'dotenv'
env.config()

await client.start()

await client.sub(['test-1'],[({channel,data})=>{
    console.log(channel,data)
},({channel,data})=>{
    console.log(channel,data,'-**-')
}])

await client.pub('test-1',{name:'ddd'})