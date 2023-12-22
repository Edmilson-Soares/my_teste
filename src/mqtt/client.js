
import mqtt from 'mqtt'

//'mqtt://localhost:1883'

export default {
    sub(url,topics){
        let client={};
        client.mqtt = mqtt.connect(url)
        client.mqtt.on('connect', () => {
            client.connect=true
            topics.map(topic => {
                console.log('ddd')
                client.mqtt.subscribe(topic)
            })
        })

        return {
            on(fn){
                if(Array.isArray(fn)){
                    fn.forEach(fun => {
                        client.mqtt.on('message',async (topic, message) => {
                            let data = message.toString()
                            try {
                               data =JSON.parse(data)
                            } catch (error) {

                                
                            }
                            await fun({topic,data})
                        })
        
                    });
                }else{
                    client.mqtt.on('message',async (topic, message) => {
                        let data = message.toString()
                        try {
                            data =JSON.parse(data)
                         } catch (error) {
                             
                         }
                        await fn({topic,data})
        
                    })
    
                }

            
            }
        }
    },
    pub(url){
        let client={};
        client.mqtt = mqtt.connect(url)
        client.mqtt.on('connect', () => {
            console.log('ddd')
            client.connect=true
        })
    return {
        send(topic,data){

            let input =data
            if(typeof input=='object'){
                input=JSON.stringify(input)
            }

            if(input.includes(';')){
                const obj={}
                input.split(';').forEach(prop => {
                    if(prop){
                        const [name,value]=prop.split('=')
                        obj[name]=value
                    }
                    
                });

                input=JSON.stringify(obj)

    
            }

            console.log(input)
            if(client.mqtt){
                client.mqtt.publish(topic,input)
            }
            return {
                send:this.send
            }
        }
    }
    }

}