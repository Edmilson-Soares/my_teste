
import {serve} from './server.js'
import {client} from './client.js'

await serve({
  services:[{
    name:'user.create',
    execute:(data)=>{
      return {
        ask:'ok'
      }
    }
  },
  {
    name:'auth.login',
    execute:(data)=>{
      return {
        ask:'ok'
      }
    }
  }
]

})


const cl= client({})
const res=await cl.cmd('user.create',{name:'dddd'})
const res1=await cl.cmd('auth.login',{name:'dddd'})
console.log(res,res1,'ddd')