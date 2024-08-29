const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let existUser = await userModel.findOne({email: email});
        if(existUser){
            res.send("User already exists")
        } else {
            bcrypt.genSalt(10, (err, salt)=>{
                if(err) return res.send(err.message);
                else {
                    bcrypt.hash(password, salt, async (err, hash)=> {
                        let user = await userModel.create({
                            fullname,
                            email,
                            password: hash
                        });

                        let token = generateToken(user);
                        res.cookie("token", token)
                        res.send(user);
                    });
                }
            })
        }
        
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Email or Password incorrect!");

    bcrypt.compare(password, user.password, (err, result)=> {
        if(result){
            let token = generateToken(user);
            res.cookie('token', token);
            res.send("Logged in successfully!")
        } else {
            return res.send("Email or Password incorrect!")
        }
    })
}