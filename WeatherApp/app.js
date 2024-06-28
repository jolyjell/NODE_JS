const express = require("express");
const fetch = require("node-fetch");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readFile('cities.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const cities = JSON.parse(data);
        res.render('main', { cities });
    });
});

app.get('/weather/:city', async (req, res) => {
    try {
        const city = req.params.city;
        const key = 'b5018676b6c9e7d01aa7056fd2b9186d';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

        const response = await fetch(url);
        const weatherData = await response.json();
        res.render('weather', { city, weather: weatherData });
    } catch (error) {
        console.error(error);
        res.status(400).render('400');
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
