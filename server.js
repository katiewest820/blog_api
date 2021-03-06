const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true}));
const blogPosts = require('./blog-posts');
const blogPostsEdits = require('./blog-posts-id');

app.all('/');
app.use('/', blogPosts);
app.use('/edit', blogPostsEdits);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  //return new Promise((resolve, reject) => {
    console.log('Closing server');
     server.close(function() {
    process.exit(0);
  	});//err => {
    //   if (err) {
    //      reject(err);
    //      console.log(err)
    //      return;
    //    }
       console.log('resolved')
    //   // return;
    //   done();
    // });
   
  //});
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};