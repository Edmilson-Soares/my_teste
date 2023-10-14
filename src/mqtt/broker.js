// MQTT broker
import mosca from 'mosca'


const serve=({
    settings = {port: 1234}
})=>{
    const broker = new mosca.Server(settings)

    broker.on('ready', ()=>{
        console.log('Broker is ready!')
    })
    
    broker.on('published', (packet)=>{
       const message = packet.payload.toString()
        //console.log(message)
    })
    
}

export {serve}

///////////////
