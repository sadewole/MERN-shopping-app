const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const items = require('./routes/api/item')

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/mern-stack', {
    useNewUrlParser: true,
    useFindAndModify: false,
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})


app.use('/api/v1/', items)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})