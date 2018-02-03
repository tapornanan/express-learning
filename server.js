const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const PORT = process.env.PORT || 3000;

let app = express();

// Register handlebar partials function.
hbs.registerPartials(__dirname + '/views/partials');

// Helper function called in partial
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

// Helper function to capitalize text
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// set view engine to handlebar
app.set('view engine', 'hbs');


// next is called when finished.
app.use((req, res, next) => {
    // like check authentication if it succes call next();
    let now = new Date().toString();
    const log = `Incoming request Time: ${now}, Method: ${req.method}, Path: ${req.path}\n`;
    console.log(log);
    
    fs.appendFile('server.log', log, (err) => {
        if (err) console.log(err)
        next();
    })
})

app.use((req, res, next) => {
    res.render('maintainance.hbs');
})

// middleware serve as static cotents.
app.use(express.static(__dirname + '/public'))



app.get('/', (req, res) => {
    
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'YoLo Captain'
    })
});


app.get('/about', (req, res) => {
    console.log(req.params)
    res.render('about.hbs', {
        name: 'pornanan',
        pageTitle: 'About'
    });
})


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request!'
    })
})

app.listen(PORT, () => {
    console.log('server is running at port 3000...\nhttp://localhost:3000')
});