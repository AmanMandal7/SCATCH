const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Hey its fucking working products!')
});

module.exports = router;