
import Redis from "ioredis";
//https://www.npmjs.com/package/ioredis
let ioredis_pub;
let ioredis_sub;

export default {
    start(){

        ioredis_pub= new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            username: process.env.REDIS_USERNAME||"default", 
            password: process.env.REDIS_PASSWORD,
            db: 0, // Defaults to 0
          });

          ioredis_sub= new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            username: process.env.REDIS_USERNAME||"default", 
            password: process.env.REDIS_PASSWORD,
            db: 0, // Defaults to 0
          });

    },
   async sub(channels,fn){

        await new Promise((resolve, reject) => {
                ioredis_sub.subscribe(...channels, (err, count) => {
                    if (err) {
                    console.error("Failed to subscribe: %s", err.message);
                    reject(err)
                    } else {
                    // `count` represents the number of channels this client are currently subscribed to.
                    console.log(
                        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
                    );

                    if(Array.isArray(fn)){
                        fn.forEach(fun => {
                            ioredis_sub.on("message",async (channel, message) => {
                                let data =message
                                try {
                                    data=JSON.parse(data)
                                } catch (error) {
                                    
                                }
                                await fun({data,channel})
                               
                              });
                            
                        });

                    }else{
                        ioredis_sub.on("message",async (channel, message) => {
                            let data =message
                            try {
                                data=JSON.parse(data)
                            } catch (error) {
                                
                            }
    
                            await fn({data,channel})
                           
                          });
                    }

                    resolve()
                    }
                });
            })


    },
  async  pub(channel,data){
        let input=data
   
        if(typeof input =='object'){
            input=JSON.stringify(input)
        }
       //console.log(input,channel,await ioredis_pub.publish(channel, input))
       await ioredis_pub.publish(channel, input);

    }
}