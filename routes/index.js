const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/chatbot', async (req, res) => {
    console.log(req.body);
    const response = await global.nlp.process(req.body.input);
    res.json(response);
});

router.post('/get_bonos', async (req, res) => {
    console.log(req.body);
    res.json({ answer: `El telefono ${req.body.input} puede contratar un bono de ${Math.floor(Math.random() * 15)}GB  por solo 1250€ (mas I.V.A.)` });
});

router.post('/get_saldo', async (req, res) => {
    console.log(req.body);
    res.json({ answer: `El telefono ${req.body.input} tiene un saldo activo de ${Math.floor(Math.random() * 101)}€` });
});




module.exports = router;