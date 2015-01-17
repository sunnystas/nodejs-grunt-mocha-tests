var request = require('superagent')
  , should = require('chai').should();
var url = 'https://localhost:8080';
var token = '66LOHAiB8Zeod1bAeLYW';
var N = 4, limit0 = 0, limit2 = 2;
var docsKeys = [];

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var addDocs = function() {
    request
      .post(url + '/stores/Scores')
      .send({
        'score': 1876,
        'playerName': "Karl",
        'cheatMode': false
      })
      .set('X-Auth-Token', token)
      .accept('json')
      .end(function(res){
        docsKeys.push(res.body.key);
      });
};


describe('Store query tests:', function(){
  describe('Limit document results', function(){
    before(function(done){
      for (var i = 0; i < N; i++)
        addDocs();
      setTimeout(function() {
        done();
      }, 200);
    });

    it('#GET should response 200 with expected results', function(done){
      request
        .get(url + '/stores/Scores')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(N);
          res.body.results.should.have.deep.property('[0].$name');
          res.body.results.should.have.deep.property('[0].$store');
          res.body.results.should.have.deep.property('[0].$key');
          res.body.results.should.have.deep.property('[0].$version');
          res.body.results.should.have.deep.property('[0].$timestamp');
          res.body.results.should.have.deep.property('[0].$payload');
          done();
        });
    });
    it('#GET with `limit=0` should response 200 with expected results (N documents)', function(done){
      request
        .get(url + '/stores/Scores?limit=0')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(N);
          res.body.results.should.have.deep.property('[0].$name');
          res.body.results.should.have.deep.property('[0].$store');
          res.body.results.should.have.deep.property('[0].$key');
          res.body.results.should.have.deep.property('[0].$version');
          res.body.results.should.have.deep.property('[0].$timestamp');
          res.body.results.should.have.deep.property('[0].$payload');
          done();
        });
    });
    it('#GET with `limit=2` should response 200 with expected results (2 documents)', function(done){
      request
        .get(url + '/stores/Scores?limit=2')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(limit2);
          res.body.results.should.have.deep.property('[0].$name');
          res.body.results.should.have.deep.property('[0].$store');
          res.body.results.should.have.deep.property('[0].$key');
          res.body.results.should.have.deep.property('[0].$version');
          res.body.results.should.have.deep.property('[0].$timestamp');
          res.body.results.should.have.deep.property('[0].$payload');
          done();
        });
    });
    it('#GET with special chars (except _,-,@,!) in store should response 405', function(done){
      request
        .get(url + '/sto*r^es/Scores')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(405);
          done();
        });
    });
    it('#GET with special chars (except _,-,@,!) in key should response 400', function(done){
      request
        .get(url + '/stores/Sco^r&es')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done();
        });
    });
    it('#GET with wrong "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores/Scores')
        .set('X-Auth-Token', 'wrong_token')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done();
        });
    });
    it('#GET without "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores/Scores')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done();
        });
    });
    after(function(done) {
      request
        .del(url + '/stores/Scores')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(){
          done();
        });
    });
  });

  describe('Documents pagination', function(){
    before(function(done){
      for (var i = 0; i < N; i++)
        addDocs();
        setTimeout(function() {
          done();
        }, 200);
    });

    it('#GET with `page=0` should response 200 with expected results (4-documents)', function(done){
      request
        .get(url + '/stores/Scores?page=0')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(4);
          done();
        });
    });
    it('#GET with `page=-1` should response 200 with expected results (0-documents)', function(done){
      request
        .get(url + '/stores/Scores?page=1')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(0);
          done();
        });
    });
    it('#GET with `page=0, limit=2` should response 200 with expected results (2 documents)', function(done){
      request
        .get(url + '/stores/Scores?limit=2&page=0')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(2);
          done();
        });
    });
    it('#GET with `page=1, limit=2` should response 200 with expected results (2 documents)', function(done){
      request
        .get(url + '/stores/Scores?limit=2&page=1')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(2);
          done();
        });
    });
    it('#GET with `page=2, limit=2` should response 200 with expected results (0 documents)', function(done){
      request
        .get(url + '/stores/Scores?limit=2&page=2')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(0);
          done();
        });
    });
    it('#GET with special chars (except _,-,@,!) in store should response 405', function(done){
      request
        .get(url + '/sto*r^es/Scores?limit=2&page=1')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(405);
          done();
        });
    });
    it('#GET with special chars (except _,-,@,!) in key should response 400', function(done){
      request
        .get(url + '/stores/Sco^r&es?limit=2&page=1')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done();
        });
    });
    it('#GET with wrong "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores/Scores')
        .set('X-Auth-Token', 'wrong_token')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done();
        });
    });
    it('#GET without "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores/Scores')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done();
        });
    });
    after(function(done) {
      request
        .del(url + '/stores/Scores')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(){
          done();
        });
    });
  });

});
