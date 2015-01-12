var request = require('superagent')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should();


describe('Trial task tests', function(){
  describe('#success test for GET', function(){
    it('GET request should succeed', function(){
      request
        .get('https://localhost:8080/stores/demo')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200).or.be.equal(201);
          res.body.should.have.ownProperty('hello');
          res.body.hello.should.be.equal('world');
        });
    });
    it('GET request of non-existing URL should succeed with error code', function(){
      request
        .get('https://localhost:8080/stores/demo_')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(404);
        });
    });
    it('GET request with parameter should succeed', function(){
      request
        .get('https://localhost:8080/stores/demo')
        .query({hello: 'foo'})
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200).or.be.equal(201);
          res.body.should.have.ownProperty('hello');
          res.body.hello.should.be.equal('foo');
        });
    });
    it('POST request should succeed', function(){
      request
        .post('https://localhost:8080/stores/demo')
        .query({foo: 'bar'})
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(201);
          res.body.should.have.ownProperty('message');
          res.body.message.should.be.equal('created');
        });
    });
  });
});
