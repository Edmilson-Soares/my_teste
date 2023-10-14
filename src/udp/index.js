import { serve } from "./udp/server.js";
import { client } from "./udp/client.js";


await serve({})

 await client({
    on:({data})=>{
        console.log('>',data)
    }
 }).send('ddd')