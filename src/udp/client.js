import UDP from 'dgram'

const client=({
    port = 2222,
    hostname = 'localhost',
   on= async({data,send}) => {
    console.log(data)
   }

})=>{

    const client = UDP.createSocket('udp4')

    client.on('message',async (message, info) => {
        let data=message.toString()
        try {
            data=JSON.parse(data)
        } catch (error) {
            
        }
    
        const send=({data,port,address})=>{
    
            new Promise((resolve, reject) => {
                let input=data
                if(typeof data=='object'){
                    input=JSON.stringify(input)
                }
                const packet = Buffer.from(input)
                server.send(packet, info.port||port, info.address||address, (err) => {
                    if (err) return reject(err)
                    resolve(true)
                  })
            })
    
    
        }
    
        await on({data,send})
      })


return {
    send(data){
         let input=data
        if(typeof data=='object'){
            input=JSON.stringify(input)
        }
        const packet = Buffer.from(input)
        return new Promise((resolve, reject) => {
            client.send(packet, port, hostname, (err) => {
                if (err) return reject(err)
                resolve(true)
                })
        })
  
            }

    }
}


export {
    client
}

/*
(message, info) => {
  // get the information about server address, port, and size of packet received.

  console.log('Address: ', info.address, 'Port: ', info.port, 'Size: ', info.size)

  //read message from server

  console.log('Message from server', message.toString())
}
*/