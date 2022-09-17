const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    nick: String,
    password: String,
    pokemons: []
});

const User = model('User', userSchema);

module.exports = User