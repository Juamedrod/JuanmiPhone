const fs = require('fs');
const path = require("path");
const axios = require('axios').default;
const { dockStart } = require('@nlpjs/basic');
const express = require('express');
const app = express();
const port = 3000;

/* Read the data inside the model trained file */
const data = fs.readFileSync('model.nlp', 'utf8');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* URL encoding and body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATICS */
app.use(express.static('statics'));

/* Router Imports */
const indexRouter = require('./routes/index');

/* Routing entry point */
app.use('/', indexRouter);

(async () => {
    const dock = await dockStart();
    const nlp = dock.get('nlp');
    await nlp.train();
    nlp.save();
    /* await nlp.import(data); */
    global.nlp = nlp;

    const resp = await nlp.process('Hola');
    console.log(resp);

    app.listen((process.env.PORT || port), () => {
        console.log(`\n /*************************************\n 
        My first nlp App listening on port ${port} 
        \n***************************************/\n`)
    });
})();




