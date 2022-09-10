const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/chatbot', async (req, res) => {
    console.log(req.body);
    const response = await global.nlp.process(req.body.input);
    res.json(response);
});


module.exports = router;