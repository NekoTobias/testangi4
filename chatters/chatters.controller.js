const express = require('express');
const router = express.Router();
const chatterService = require('./chatter.service');
const userService = require('../users/user.service');
// routes
//router.post('/authenticate', authenticate);
router.post('/current/avatars', uploadAvatars);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
//router.put('/:id', update);
//router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     chatterService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function uploadAvatars(req, res, next) {
    console.log('hey')
    chatterService.uploadAvatars(req.user.sub,req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    chatterService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    //console.log(req.user)
    userService.getById(req.user.sub)
        .then(user => chatterService.getById2(user.pid)).then(chatter=>{/*console.log(chatter);*/chatter ? res.json(chatter[0]) : res.sendStatus(404)}) 
        .catch(err => next(err));
}

function getById(req, res, next) {
    chatterService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

// function update(req, res, next) {
//     chatterService.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function _delete(req, res, next) {
//     chatterService.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }