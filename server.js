const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jsonParser = bodyParser.json();
const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true}));
const blogPosts = require('./blog-posts');
const blogPostsEdits = require('./blog-posts-id');

mongoose.connect('mongodb://Admin:password@ds129018.mlab.com:29018/nodetest', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to a database')
});

app.all('/');
app.use('/', blogPosts);
app.use('/edit', blogPostsEdits);

app.get('/one', (req, res) => {
	res.send('Hello World');
})

app.listen(port, () => {
	console.log(`Your app is running on port: ${port}`);
});