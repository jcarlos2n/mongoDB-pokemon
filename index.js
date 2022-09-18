
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3001;
const router = require('./router')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(router)
app.listen(PORT, () => {
    console.log('server running on port', PORT)
})

const connectionString = `mongodb+srv://jcarlos2n:conecta.1@cluster0.je69z9j.mongodb.net/pruebaMongo?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')
    }).catch(err => {
        console.error(err);
    })

//ENDPOINTS
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
})




