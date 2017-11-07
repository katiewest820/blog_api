const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

const {BlogPosts} = require('./models');



//put requests 
router.put('/:id', jsonParser, (req, res) => {
	let requiredFields = ['id', 'title', 'content', 'author'];
	for(let i = 0; i < requiredFields.length; i++){
		let field = requiredFields[i];
		if(!(field in req.body)){
			console.log(`missing required field: ${field}`)	
			return res.status(400).send(`you are missing ${field} field`);
		}
	}
	if(req.params.id !== req.body.id){
		console.log('No match to id');
		return res.status(400).send(`Your request path id: ${req.params.id} must match your blog id: ${req.body.id}. Please try again`);
	}	
	const item = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author	
	});
	console.log(`Blog id: ${req.params.id} has been updated`);
	return res.json(item).send(`Blog id: ${req.params.id} has been updated`).status(204);
});

//delete request
router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`${req.params.id} has been removed`);
	res.send('Your blog entry has been removed').status(204);
	return;
});


module.exports = router;