var request = require('superagent')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
var url = 'https://localhost:8080';
var token = '66LOHAiB8Zeod1bAeLYW';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe('Trial task tests.', function(){
  describe('Get all stores', function(){
    it('#GET right path with right token should succeed', function(done){
      request
        .get(url + '/stores')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array');
          done()
        });
    });
    it('#GET with wrong "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores')
        .set('X-Auth-Token', 'wrong_token')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#GET without "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#GET wrong path with right token should response 400', function(done){
      request
        .get(url + '/foo')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(405);
          done()
        });
    });
    it('#GET wrong path with right token should response 400', function(done){
      request
        .get(url + '/stores')
        .set('X-Auth-Token', token)
        .set(':version', 0)
        .set('Content-Length', 0)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done()
        });
    });
  });
});
