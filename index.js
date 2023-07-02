const express = require('express')
const cors = require('cors')
require("dotenv").config();
const routerApi = require("./routes/index");
const sequelize = require('./database/database')
const Port = process.env.PORT || 3000
const server  = express()
server.use(express.json())
server.use(cors())

require ('./entities/questions/questionModel')

server.get('/', (req, res) =>{
    res.json({ respuesta: `Esto va en directo por el puerto ${Port}`})
})
routerApi(server);

server.listen(Port, ()=>{
console.log(`Ok listen in ${Port}`)
})

const connect = async () =>{
    try {
      await sequelize.sync();
      console.log("All models were synchronized successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

}
connect()