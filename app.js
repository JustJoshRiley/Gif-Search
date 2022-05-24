// Libraries
const express = require('express');
const exphbs  = require('express-handlebars');

// Require tenorjs
const Tenor = require("tenorjs").client({
  // Replace with your own key
    "Key": "NUR68V0TQXCX",
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App-Setup
const app = express();

// Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Styles
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    Tenor.Search.Query(term, "10")
    .then(response => {
    const gifs = response;
    res.render('home', { gifs })
    })
    .catch(console.error);
})

app.get('/', (req, res) => {
    const gifUrl = 'https://media1.tenor.com/images/561c988433b8d71d378c9ccb4b719b6c/tenor.gif?itemid=10058245'
    res.render('hello-gif', {gifUrl});
});

app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
    const name = req.params.name;
  // render the greetings view, passing along the name
    res.render('greetings', { name });
})
// Start Server

app.listen(3000, () => {
    console.log('listening on port localhost:3000!');
});