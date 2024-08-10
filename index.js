const express = require('express')
const cors = require('cors')
require("dotenv").config();
const routerApi = require("./routes/index");
const { connect } = require('./database/dbSync');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const Port = process.env.PORT || 3000
const server  = express()
server.use(cookieParser())
server.use(express.json())
// const corsPort = 3001
server.use(
  cors({
    origin: [`http://localhost:${3001}`, `http://localhost:${3002}`, `http://localhost:${3003}`, `https://masterqgame.vercel.app/`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
  })
);
server.use(
  cors({
    origin: [`http://localhost:${3001}`, `http://localhost:${3002}`, `http://localhost:${3003}`, `https://masterqgame.vercel.app/`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false,
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
