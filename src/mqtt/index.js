import mqtt from './client.js'
import {serve} from './broker.js'


await serve({

})

const url='mqtt://localhost:1234'


mqtt.sub(url,['test']).on([({topic,data})=>{
    console.log({topic,data},'aa')
 },({topic,data})=>{
    console.log({topic,data},'dddd')
 }])




mqtt.pub(url).send('test','id=444;').send('test',{id:'222222'})

