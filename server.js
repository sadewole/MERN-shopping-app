const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

require('dotenv').config()
// const dbURI = 'mongodb://localhost:27017/mern-shopping'
const dbURI = process.env.DBconnection

// connect to mongodb
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true
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
app.use(cors())
app.use(express.static('client/build'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



app.use('/api/v1/item', require('./routes/api/item'))
app.use('/api/v1/user', require('./routes/api/user'))
app.use('/api/v1/auth', require('./routes/api/auth'))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})