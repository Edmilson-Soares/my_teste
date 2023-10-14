import UDP from 'dgram'



const serve=({
    port = 2222,
    start=({server}) => {
        // Server address it’s using to listen
      
        const address = server.address()
        console.log('Listining to ', 'Address: ', address.address, 'Port: ', address.port)
      },
    on= async({data,send}) => {

        console.log({data,send})

       await send({data:'ddddddddddddddddd'})

      

      }
})=> {


const server = UDP.createSocket('udp4')

server.on('listening', ()=>start({server}))

server.on('message',async (message, info) => {
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

server.bind(port)


}


export {
    serve
}


/**
 * 
  (message, info) => {
  console.log('Message', message.toString())

  const response = Buffer.from('Message Received')

  //sending back response to client

  server.send(response, info.port, info.address, (err) => {
    if (err) {
      console.error('Failed to send response !!')
    } else {
      console.log('Response send Successfully')
    }
  })
}
 */