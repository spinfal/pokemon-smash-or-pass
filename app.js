/* modules */
const express = require('express');

/* imports and variables */
const Global = require('./global.js');
const Pokemon = require('./pokemon.js');
const app = express();

/* set view engine */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/* static files */
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/imgs', express.static(__dirname + 'public/imgs'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/pokemon', (req, res) => {
    return res.status(200).json(Pokemon);
});

app.listen(Global.port, () => {
    console.log(`Server is running on port ${Global.port}`);
});