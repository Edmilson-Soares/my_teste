const Seneca = require('seneca')

const client=({port=8000,host='0.0.0.0'})=>{
   const client= Seneca().client({host,port})
   return {
     async cmd(name,data){
        return  new Promise((resolve, ) => {
            client.act({ cmd:name,data}, function (err, result) {
                if (err) return reject(err)
                resolve(result)
              })
        })
      }
   }


}

module.exports={
    client
}