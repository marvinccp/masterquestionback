const express = require('express')
const cors = require('cors')
require("dotenv").config();
const routerApi = require("./routes/index");
const { connect } = require('./database/dbSync');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const Port = process.env.PORT || 3000
const corsPort = 3000
const server  = express()
server.use(cookieParser())
server.use(express.json())
server.use(
  cors({
    origin: `http://localhost:${corsPort}`,
    credentials: true,
  })
);
server.use(morgan('dev'))



server.get('/', (req, res) =>{
    res.json({ respuesta: `Esto va en directo por el puerto ${Port}`})
})
routerApi(server);

server.listen(Port, ()=>{
console.log(`Ok listen in ${Port}`)
})

connect();
