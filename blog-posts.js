const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//const placeModel = require('./testmodel');

const jsonParser = bodyParser.json();
const app = express();

const {BlogPosts} = require('./models');

BlogPosts.create('the best thing ever', 'flalalalallahiihihihi', 'Todd West')

//get requests
router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});


//post requests 
router.post('/', jsonParser, (req, res) => {
	let requiredFields = ['title', 'content', 'author'];
	for(let i = 0; i < requiredFields.length; i++){
		let field = requiredFields[i];
		if(!(field in req.body)){
			console.log(`missing required field: ${field}`);
			return res.status(400).send(`you are missing ${field} field`);
		}
	}	
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(200).json(item);
});

module.exports = router;