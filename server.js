const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const items = require('./routes/api/item')
const path = require('path')
const dbURI = require('./config').DBconnection

// connect to mongodb
mongoose.connect(dbURI, {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to DB');
});
db.on('error', (err) => {
    console.log(err);
});

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use('/api/v1/', items)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.length('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})