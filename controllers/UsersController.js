
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let authConfig = require('../config/auth')

const UsersController = {};

UsersController.getUsers = (req, res) => {

    User.find({}).then(result => {
        res.json(result);
        mongoose.connection.close();
    })
};

UsersController.getData = async (req, res) => {
    const { id } = req.params;

    let user = await User.findOne({ _id: id })
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.send(err);
        })

};

UsersController.postUser = async (req, res) => {

    let nick = req.body.nick;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(3));

    if (nick === "" || password === "") {

        res.send("Rellena los campos que faltan");
    } else {

        User.create({
            nick: nick,
            password: password
        }).then(user => {

            res.send(`${user.nick}, you have been added succesfully`);
        }).catch(err => {

            res.send(err);
        })
    }
};

UsersController.loginUser = async (req, res) => {

    let doc = req.body.nick;
    let clave = req.body.password;

    let user = await User.findOne({ nick: doc });

    await User.findOne({
        nick: doc
    }).then(userFind => {

        if (!userFind) {
            res.send('Incorrect user or password');

        } else {

            if (bcrypt.compare(clave, userFind.password)) {
                let token = jwt.sign({ user: userFind }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                let loginOkMessage = `Welcome again ${userFind.nick}`
                res.json({
                    loginOkMessage,
                    user: {
                        nick: userFind.nick,
                        pokemons: userFind.pokemons
                    },
                    token: token
                })
            }


        }
    }).catch(err => {
        console.error(err);
    })
};

UsersController.updateUser = async (req, res) => {
    const { id } = req.params;
    const userUp = req.body;

    const newUpdate = {
        nick: userUp.nick,
    }

    let user = await User.findByIdAndUpdate(id, newUpdate, { new: true, safe: true, upsert: true })
        .then(result => {
            res.json(result)
        }).catch(err => {
            console.error(err)
        })
};

UsersController.addPokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const pokeUp = req.body;

        const newPoke = {
            img: pokeUp.img,
            name: pokeUp.name,
            exp: pokeUp.exp,
            hp: pokeUp.hp,
            ataque: pokeUp.ataque,
            defensa: pokeUp.defensa,
            especial: pokeUp.especial
        }

        const updateUserwithNewPokemon = await User.findByIdAndUpdate(id, { $push: { 'pokemons': newPoke } }, { new: true, safe: true, upsert: true })
    
        return res.json({ success: true, data: updateUserwithNewPokemon })
    } catch (error) {
        return res.json({ success: false, error: "something error" })
    }

}

UsersController.deleteUser = async (req, res) => {
    const { id } = req.params;

    const dele = await User.findByIdAndDelete(id)
        .then(result => {
            res.json('User has been deleted succesfully')
        }).catch(err => {
            console.error(err)
        })
    if (dele === null) return res.sendStatus(404)

    res.status(204).end()
}

module.exports = UsersController;