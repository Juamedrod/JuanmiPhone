const fs = require('fs');
const axios = require('axios').default;
const { dockStart } = require('@nlpjs/basic');
const express = require('express');
const app = express();
const port = 3000;

const data = fs.readFileSync('model.nlp', 'utf8');


(async () => {
    const dock = await dockStart();
    const nlp = dock.get('nlp');
    // await nlp.train();
    nlp.save();
    await nlp.import(data);

    app.get('/', async (req, res) => {
        res.send('Introduce como parámetro en la URL el nombre de una ciudad para ver el tiempo actual');
    });

    app.get('/:sentence', async (req, res) => {
        const response = await nlp.process('es', 'el tiempo en ' + req.params.sentence);
        console.log(`\n 
        /*************************************\n 
         NLP RESPONSE
         \n***************************************/\n`)
        console.log(response);

        /* Axios Weather API */
        const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${response?.entities[0]?.option}&limit=5&appid=5d08a9224a6e496814de3e2980c47746`);
        console.log(`\n /*************************************\n 
         API RESPONSE
         \n***************************************/\n`)
        // console.log(result.data);
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${result.data[0].lat}&lon=${result.data[0].lon}&appid=5d08a9224a6e496814de3e2980c47746`);
        console.log(weather.data);

        res.send(weather.data);
    });

    app.listen(port, () => {
        console.log(`\n /*************************************\n 
        My first nlp App listening on port ${port} 
        \n***************************************/\n`)
    });
})();




