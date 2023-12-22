import { serve } from "./server.js";
import { client } from "./client.js";


await serve({})
/*
 await client({
    on:({data})=>{
        console.log('>',data)
    }
 }).send('ddd')
 */