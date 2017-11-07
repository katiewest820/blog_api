const chai = require('chai');
const {app, runServer, closeServer} = require('../server');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('blogging', function(){
	before(function(){
		return runServer();
	});
	after(function(){
		return closeServer();
	});
	it('should check GET request', function(){
		return chai.request(app)
		.get('/')
		.then(function(res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.forEach(function(item){
				item.should.be.a('object');
				item.should.have.all.keys(
					'id', 'title', 'content', 'author', 'publishDate');
			});
		});
	});
	 it('should check POST request', function(){
	 	const newItem = {title: 'hello world', content: 'oh happy day', author: 'Katie West'};
	 	return chai.request(app)
	 	.post('/')
	 	.send(newItem)
	 	.then(function(res){
	 		res.should.have.status(200);
	 		res.should.be.json;
	 		res.body.should.be.a('object');
	 		res.body.should.include.keys(
	 			'id', 'title', 'content', 'author', 'publishDate');
	 	});
	});
	it('should check PUT request', function(){
		const updatedItem = {
			title: 'little bunny foofoo',
			content: 'falalalallala'
		}
		return chai.request(app)
		.get('/')
		.then(function(res){
			updatedItem.id = res.body[0].id;
		});
		return chai.request(app)
		.put(`/${updatedItem.id}`)
		.then(function(res){
			res.should.have.status(204);
			res.should.be.json;
			res.body.should.include.keys(
				'id', 'title', 'content', 'author');
		});
	});
	it('should check DELETE request', function(){
		const deleteVal = {
			title: 'the best thing ever'
		}
		return chai.request(app)
		.get('/')
		.then(function(res){
			deleteVal.id = res.body.id;
		});
		return chai.request(app)
		.delete(`/${deleteVal.id}`)
		.then(function(res){
			res.should.have.status(204)
		});	
	});	
});