//Importo el fichero .env para traerme las variables de entorno
require('dotenv').config();
module.exports = {
    //secret: process.env.AUTH_SECRET,
    secret: process.env.AUTH_SECRET || "hola1234", //KEY USADA PARA ENCRIPTAR

    //expires: process.env.AUTH_EXPIRES,
    expires: process.env.AUTH_EXPIRES || "3h", //DURACIÓN DEL TOKEN
    //rounds: process.env.AUTH_ROUNDS
    rounds: process.env.AUTH_ROUNDS || 3
}