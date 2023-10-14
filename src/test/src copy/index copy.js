
import express from 'express'
import swaggerUi from 'swagger-ui-express';


const app=express()

app.use(express.json())




app.get('/',(_,res)=>{
   res.json({
      h:'ddddddd/ddd'
   })
})




var options = {
  explorer: true,
  "swagger": "2.0",
  "info": {
  "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
  "version": "1.0.6",
  "title": "Swagger Petstore",
  "termsOfService": "http://swagger.io/terms/",
  "contact": {
  "email": "apiteam@swagger.io"
  },
  "license": {
  "name": "Apache 2.0",
  "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
  }
  },

}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, options));

app.listen(process.env.PORT||3000)