const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    nick: String,
    password: String,
    pokemons: Array
});

const User = model('User', userSchema);

module.exports = User