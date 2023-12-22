const Seneca = require('seneca')



// .use('seneca-amqp-transport')

//seneca.use('redis-cache');

const serve=({ services,port=8000,host='0.0.0.0'})=>{
    const seneca=Seneca()
   services.forEach(service=> {
    seneca.add('cmd:'+service.name,async ({data}, reply) => {
        try {
            const output=await service.execute(data)
            reply(null,output) 
        } catch (error) {
            reply(error) 
        }
        
      })
    });

    seneca.listen({host,port})

}

module.exports= {
    serve
}