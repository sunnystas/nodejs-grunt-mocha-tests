var request = require('superagent')
  , should = require('chai').should()
  , expect = require('chai').expect;
var url = 'https://localhost:8080';
var token = '66LOHAiB8Zeod1bAeLYW';
var limit0 = 0, limit2 = 2;
var docs = require('./fixtures/documents.js').testDocuments;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var addDocs = function(doc) {
    request
      .post(url + '/stores/Scores')
      .send(doc)
      .set('X-Auth-Token', token)
      .accept('json')
      .end(function(res){
        return res.body.key;
      });
};

describe('Store query tests:', function(){
  describe('Limit document results', function(){
    var DocumentsInStore = 4;
    before(function(done){
      for (var i = 0; i < DocumentsInStore; i++)
        addDocs(docs[i]);
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
          res.body.should.have.property('results').and.be.an('array').and.have.length(DocumentsInStore);
          res.body.results.should.have.deep.property('[0].$name');
          res.body.results.should.have.deep.property('[0].$store');
          res.body.results.should.have.deep.property('[0].$key');
          res.body.results.should.have.deep.property('[0].$version');
          res.body.results.should.have.deep.property('[0].$timestamp');
          res.body.results.should.have.deep.property('[0].$payload');
          done();
        });
    });
    it('#GET with `limit=0` should response 200 with expected results (DocumentsInStore documents)', function(done){
      request
        .get(url + '/stores/Scores?limit=0')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(DocumentsInStore);
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
    var DocumentsInStore = 4;
    before(function(done){
      for (var i = 0; i < DocumentsInStore; i++)
        addDocs(docs[i]);
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
    it('#GET with `page=2, limit=2` should response 200 with expected results (2 documents)', function(done){
      request
        .get(url + '/stores/Scores?limit=2&page=2')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(2);
          done();
        });
    });
    it('#GET with `page=3, limit=2` should response 200 with expected results (0 documents)', function(done){
      request
        .get(url + '/stores/Scores?limit=2&page=3')
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

  describe('#Documents without payload', function(){
    var DocumentsInStore = 2;
    before(function(done){
      for (var i = 0; i < DocumentsInStore; i++)
        addDocs(docs[i]);
      setTimeout(function() {
        done();
      }, 200);
    });
    it('#GET should response 200 with expected results', function(done){
      request
        .get(url + '/stores/Scores?keysOnly=true')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(200);
          res.body.should.have.property('results').and.be.an('array').and.have.length(DocumentsInStore);
          res.body.results.should.have.deep.property('[0].$name');
          res.body.results.should.have.deep.property('[0].$store');
          res.body.results.should.have.deep.property('[0].$key');
          res.body.results.should.have.deep.property('[0].$version');
          res.body.results.should.have.deep.property('[0].$timestamp');
          res.body.results.should.not.have.deep.property('[0].$payload');
          done();
        });
    });
    it('#GET with special chars (except _,-,@,!) in store should response 400', function(done){
      request
        .get(url + '/sto*r^es/Scores?keysOnly=true')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done();
        });
    });
    it('#GET with special chars (except _,-,@,!) in key should response 400', function(done){
      request
        .get(url + '/stores/Sco^r&es?keysOnly=true')
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done();
        });
    });
    it('#GET with wrong "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores/Scores?keysOnly=true')
        .set('X-Auth-Token', 'wrong_token')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done();
        });
    });
    it('#GET without "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores/Scores?keysOnly=true')
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

  describe('#Filter documents with *where* and JSON-Query', function() {
    describe('##JSON-Query between', function () {
      before(function (done) {
        for (var i = 0; i < docs.length; i++)
          addDocs(docs[i]);
        setTimeout(function () {
          done();
        }, 200);
      });
      it('#GET where={"score":{"$gte":1000,"$lte":3000}} should response 200 with expected results', function (done) {
        request
          .get(url + '/stores/Scores?where={"score":{"$gte":1000,"$lte":3000}}')
          .set('X-Auth-Token', token)
          .accept('json')
          .end(function (res) {
            res.status.should.be.equal(200);
            res.body.should.have.property('results').and.be.an('array').and.have.length(7); //There are 7 documents with 1000 >= Score <= 3000 in fixture.
            for (var i = 0; i < res.body.results.length; i++) {
              res.body.results[i].should.include.keys('$name', '$store', '$key', '$version', '$timestamp', '$payload');
              res.body.results[i].$payload.should.have.property('score').and.be.within(1000, 3000);
            }
            done();
          });
      });
      it('#GET where={"score":{"$ne":1230}} should response 200 with expected results', function (done) {
        request
          .get(url + '/stores/Scores?where={"score":{"$ne":1230}}')
          .set('X-Auth-Token', token)
          .accept('json')
          .end(function (res) {
            res.status.should.be.equal(200);
            res.body.should.have.property('results').and.be.an('array').and.have.length(8);
            for (var i = 0; i < res.body.results.length; i++) {
              res.body.results[i].should.include.keys('$name', '$store', '$key', '$version', '$timestamp', '$payload');
              res.body.results[i].$payload.should.have.property('score').and.not.be.equal(1230);
            }
            done();
          });
      });
      it('#GET where={"score":{"$gt":1000,"$lt":3000}} should response 200 with expected results', function (done) {
        request
          .get(url + '/stores/Scores?where={"score":{"$gt":1000,"$lt":3000}}')
          .set('X-Auth-Token', token)
          .accept('json')
          .end(function (res) {
            res.status.should.be.equal(200);
            res.body.should.have.property('results').and.be.an('array').and.have.length(6);
            for (var i = 0; i < res.body.results.length; i++) {
              res.body.results[i].should.include.keys('$name', '$store', '$key', '$version', '$timestamp', '$payload');
              res.body.results[i].$payload.should.have.property('score').and.be.gt(1000).and.be.lt(3000);
            }
            done();
          });
      });
      it('#GET where={"playerName":{"$in":["Karl","Berta"]}} should response 200 with expected results', function (done) {
        request
          .get(url + '/stores/Scores?where={"playerName":{"$in":["Karl","Berta"]}}')
          .set('X-Auth-Token', token)
          .accept('json')
          .end(function (res) {
            res.status.should.be.equal(200);
            res.body.should.have.property('results').and.be.an('array').and.have.length(5);
            for (var i = 0; i < res.body.results.length; i++) {
              res.body.results[i].should.include.keys('$name', '$store', '$key', '$version', '$timestamp', '$payload');
              res.body.results[i].$payload.should.have.property('playerName');
              var arr = [];
              arr.push(res.body.results[i].$payload.playerName);
              ['Karl', 'Berta'].should.include.members(arr);
            }
            done();
          });
      });
      it('#GET with special chars (except _,-,@,!) in store should response 400', function (done) {
        request
          .get(url + '/sto*r^es/Scores?where={"score":{"$gte":1000,"$lte":3000}}')
          .set('X-Auth-Token', token)
          .accept('json')
          .end(function (res) {
            res.status.should.be.equal(400);
            done();
          });
      });
      it('#GET with special chars (except _,-,@,!) in key should response 400', function (done) {
        request
          .get(url + '/stores/Sco^r&es?where={"score":{"$gte":1000,"$lte":3000}}')
          .set('X-Auth-Token', token)
          .accept('json')
          .end(function (res) {
            res.status.should.be.equal(400);
            done();
          });
      });
      it('#GET with wrong "X-Auth-Token" header should response 401', function (done) {
        request
          .get(url + '/stores/Scores?where={"score":{"$gte":1000,"$lte":3000}}')
          .set('X-Auth-Token', 'wrong_token')
          .accept('json')
          .end(function (res) {
            res.status.should.be.equal(401);
            done();
          });
      });
      it('#GET without "X-Auth-Token" header should response 401', function (done) {
        request
          .get(url + '/stores/Scores?where={"score":{"$gte":1000,"$lte":3000}}')
          .accept('json')
          .end(function (res) {
            res.status.should.be.equal(401);
            done();
          });
      });
      after(function (done) {
        request
          .del(url + '/stores/Scores')
          .set('X-Auth-Token', token)
          .accept('json')
          .end(function () {
            done();
          });
      });
    });
  });

});
