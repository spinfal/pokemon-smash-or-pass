/* modules */
const express = require('express');
const RateLimit = require('express-rate-limit');

/* imports and variables */
const Global = require('./global.js');
const Pokemon = require('./pokemon.js');
const apiLimiter = RateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 150, // limit each IP to 100 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
});
const app = express();

/* middleware */
app.disable('x-powered-by');
app.use('*', apiLimiter);

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