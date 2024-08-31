const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

// Development routes 
if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {

        let owners = await ownerModel.find();
        if( owners.length > 0){
            return res.status(503).send("You don't have permission to create a new owner.")
        }

        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner)
    });
}

//Create Product route 
router.get('/admin', async (req, res) => {
    let success = req.flash("success")
    res.render('createproducts', {success})
});

//All other routes 
router.get('/', async (req, res) => {
    res.send('Hey its working owner')
});

module.exports = router;