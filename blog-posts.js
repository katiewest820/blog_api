const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const placeModel = require('./testmodel');

const jsonParser = bodyParser.json();
const app = express();

const {BlogPosts} = require('./models');

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
	BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(200).send(`Title: "${req.body.title}" has been added`);
});

router.post('/place', jsonParser, (req, res) => {
	let newPlace = new placeModel()
	newPlace.name = req.body.name;
	newPlace.lat = req.body.lat;
	newPlace.lng = req.body.lng;
	newPlace
		.save()
		.then(function() {
			res.status(200).send("Place saved");
		})
		.catch(function(){
			res.status(500).send('Something happened');
		});
});





module.exports = router;