const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Chatter = db.Chatter;
const userservice= require('./../users/user.service')

module.exports = {
    //authenticate,
    getAll,
    getById,getById2,uploadAvatars,
    create,
    //update,
    //delete: _delete
};

async function getAll() {
    return await Chatter.find().select('-id');
}

// async function generateID()  {
//     return await User.find().select('-hash').count();
// }

async function getById(id) {
    return await Chatter.findById(id).select('-id');
}

async function getById2(id) {
    return await Chatter.find({"pid":id});
}

async function create(user) {
    // validate
    
    const chatter = new Chatter();

   
    chatter.pid=user.pid;
    chatter.username=user.username;
    chatter.name=user.username;
    chatter.type='profile';

    

   
    // save user
    await chatter.save();
 
}

async function uploadAvatars(user, images) {
    // validate
    const user2 = userservice.getById(user);
    const chatter= getById2(user2.pid)[0];
    console.log(chatter);
    console.log(images)

    

   
    // chatter.pid=user.pid;
    // chatter.username=user.username;
    // chatter.name=user.username;
    // chatter.type='profile';

    

   
    // save user
    //await chatter.save();
 
}

// async function update(id, userParam) {
//     const user = await User.findById(id);

//     // validate
//     if (!user) throw 'User not found';
//     if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
// }

// async function _delete(id) {
//     await User.findByIdAndRemove(id);
// }