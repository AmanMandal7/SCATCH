const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send('Hey its fucking working users!')
});

router.post('/register', async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({email: email});
        if(user){
            res.send("User already exists")
        } else {
            bcrypt.genSalt(10, (err, salt)=>{
                if(err) return res.send(err.message);
                else {
                    bcrypt.hash(password, salt, async (err, hash)=> {
                        let createdUser = await userModel.create({
                            fullname,
                            email,
                            password: hash
                        });

                        let token = jwt.sign({email, id: createdUser._id}, 'thisisthekey');
                        res.cookie("token", token)
                        res.send(createdUser);
                    });
                }
            })
        }
        
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;