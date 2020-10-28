'use strict';
var express = require('express');
const contents = require('../controller/contents');

var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
    res.send('respond with a resource');
});


router.post('/createContent', async (req, res, next) => {
    const response = await contents.createContent(req.body);
    return res.status(response.status).send(response);
});

router.put('/updateContent', async (req, res, next) => {
    const response = await contents.updateContent(req.body);
    return res.status(response.status).send(response);
});

router.get('/findContents', async (req, res, next) => {
    const response = await contents.findContents(req.body)
    return res.status(response.status).send(response);
}); 

module.exports = router;
