
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const UsersController = require('../controllers/UsersController');

router.get('/', auth, UsersController.getUsers);
router.get('/get/:id', UsersController.getUser);
router.post('/signup', UsersController.postUser);
router.post('/login', UsersController.loginUser);
router.put('/update/:id',auth, UsersController.updateUser);
router.put('/addpoke/:id',auth, UsersController.addPokemon);
router.delete('/delete/:id',auth, UsersController.deleteUser);

module.exports = router