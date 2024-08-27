const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Hey its fucking workings users!')
});

module.exports = router;