const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config")

//Base url test
router.get('/', (req, res)=>{
    res.send('Hey its fucking working products!')
});

//Creating the product
router.post('/create', upload.single('image') ,(req, res)=> {
    res.send(req.file);
})

module.exports = router;