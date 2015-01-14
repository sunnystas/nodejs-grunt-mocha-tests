var request = require('superagent')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
var url = 'https://localhost:8080';
var token = '66LOHAiB8Zeod1bAeLYW';
var ifMatch = 1421242469472326;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


describe('Subkit tests.', function(){
  describe('#Get all stores', function(){
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
  });

  describe('#Query a store `Scores`', function(){
    it('#GET right path with right token should succeed', function(done){
      request
        .get(url + '/stores/Scores')
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
        .get(url + '/stores/Scores')
        .set('X-Auth-Token', 'wrong_token')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#GET without "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores/Scores')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
  });

  describe('#Get a document `Scores - ec8ffdf0-9b04-11e4-89d3-123b93f75cba`', function(){
    it('#GET should retrieve document with `results` parameter in the response', function(done){
      request
        .get(url + '/stores/Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
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
        .get(url + '/stores/Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
        .set('X-Auth-Token', 'wrong_token')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#GET without "X-Auth-Token" header should response 401', function(done){
      request
        .get(url + '/stores/Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
  });

  describe('#Create document in Scores-Store (Server-side generated document key)', function(){
    it('#POST with right path with right token should succeed', function(done){
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
          res.status.should.be.equal(201);
          res.body.should.have.property('message').and.be.equal('created');
          res.body.should.have.property('key').and.exist;
          done()
        });
    });
    it('#POST with wrong "X-Auth-Token" header should response 401', function(done){
      request
        .post(url + '/stores/Scores')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .set('X-Auth-Token', 'wrong_token')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#POST without "X-Auth-Token" header should response 401', function(done){
      request
        .post(url + '/stores/Scores')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#POST without `Scores` path parameter should response 400', function(done){
      // @todo whether it should response 400 or 405
      request
        .post(url + '/stores')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(405);
          done()
        });
    });
    it('#POST with space char in `Scores` path parameter should response 400', function(done){
      // @todo whether it should response 400 or 405
      request
        .post(url + '/stores/Game Scores')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#POST with special chars should succeed', function(done){
      // @todo whether it should succeed or response with some other error code
      request
        .post(url + '/stores/Scores*')
        .send({
          'score': '*18*76/*',
          'playerName': "/Karl**",
          'cheatMode': '**/'
        })
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(201);
          res.body.should.have.property('message').and.be.equal('created');
          res.body.should.have.property('key').and.exist;
          done()
        });
    });
  });

  describe('#Create document in Scores-Store (Client-side generated document key)', function(){
    it('#POST with right path with right token should succeed', function(done){
      request
        .post(url + '/stores/Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(201);
          res.body.should.have.property('message').and.be.equal('created');
          res.body.should.have.property('key').and.be.equal('ec8ffdf0-9b04-11e4-89d3-123b93f75cba');
          done()
        });
    });
    it('#POST with wrong "X-Auth-Token" header should response 401', function(done){
      request
        .post(url + '/stores/Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .set('X-Auth-Token', 'wrong_token')
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#POST without "X-Auth-Token" header should response 401', function(done){
      request
        .post(url + '/stores/Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#POST without `Scores` path parameter should response 400', function(done){
      // @todo whether it should response 400 or 401
      request
        .post(url + '/stores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done()
        });
    });
    it('#POST with space char in `Scores` path parameter should response 400', function(done){
      // @todo whether it should response 400 or 401
      request
        .post(url + '/stores/Game Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': false
        })
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done()
        });
    });
    it('#POST with special chars should response 400', function(done){
      // @todo whether it should response 400 or 201
      request
        .post(url + '/stores/Game Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba')
        .send({
          'score': '*18*76/*',
          'playerName': "/Karl**",
          'cheatMode': '**/'
        })
        .set('X-Auth-Token', token)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done()
        });
    });
  });

  describe('#Update an existing document in `Scores` store', function(){
    // @todo returns response 500
    it('#PUT with right token should succeed', function(done){
      request
        .put(url + '/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(202);
          done()
        });
    });
    it('#PUT with wrong "X-Auth-Token" header should response 401', function(done){
      request
        .put(url + '/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', 'wrong_token')
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#PUT without "X-Auth-Token" header should response 401', function(done){
      request
        .put(url + '/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#PUT without `Scores` path parameter should response 400', function(done){
      // @todo whether it should response 400 or 405
      request
        .put(url + '/stores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done()
        });
    });
    it('#PUT with space char in `Scores` path parameter should response 400', function(done){
      // @todo whether it should response 400 or 405
      request
        .put(url + '/stores/Game Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done()
        });
    });
    it('#PUT with another non-existing document key should response 404 Not found', function(done){
      // @todo whether it should response 404 or 405
      request
        .put(url + '/stores/Game Scores/1c9f4c3e-86bb-11e4-b116-123bg3f5daba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(404);
          done()
        });
    });
  });

  describe('#Conditional update of an existing document in `Scores`store', function(){
    // @todo returns response 500
    it('#PUT with right token should succeed', function(done){
      request
        .put(url + '/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(202);
          done()
        });
    });
    it('#PUT with wrong "X-Auth-Token" header should response 401', function(done){
      request
        .put(url + '/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', 'wrong_token')
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#PUT without "X-Auth-Token" header should response 401', function(done){
      request
        .put(url + '/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(401);
          done()
        });
    });
    it('#PUT without `Scores` path parameter should response 400', function(done){
      // @todo whether it should response 400 or 405
      request
        .put(url + '/stores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done()
        });
    });
    it('#PUT with space char in `Scores` path parameter should response 400', function(done){
      // @todo whether it should response 400 or 405
      request
        .put(url + '/stores/Game Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(400);
          done()
        });
    });
    it('#PUT with another non-existing document key should response 404 Not found', function(done){
      // @todo whether it should response 404 or 405
      request
        .put(url + '/stores/Game Scores/1c9f4c3e-86bb-11e4-b116-123bg3f5daba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch)
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(404);
          done()
        });
    });
    it('#PUT with "If-Match" < document.$version, the document should be updated and the response body should contain the updated values', function(done){
      // @todo it should not response 405. Whether response body should contain updated params or results[] array?
      request
        .put(url + '/stores/Game Scores/1c9f4c3e-86bb-11e4-b116-123bg3f5daba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch-1) // the last digit is less by 1
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(202);
          res.body.should.have.property('score').and.be.equal(1876);
          res.body.should.have.property('playerName').and.be.equal("Karl");
          res.body.should.have.property('cheatMode').and.be.equal(true);
          done()
        });
    });
    it('#PUT with "If-Match" = document.$version, the document should be updated and the response body should contain the updated values', function(done){
      // @todo it should not response 405. Whether response body should contain updated params or results[] array?
      request
        .put(url + '/stores/Game Scores/1c9f4c3e-86bb-11e4-b116-123bg3f5daba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch) // the last digit is correct
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(202);
          res.body.should.have.property('score').and.be.equal(1876);
          res.body.should.have.property('playerName').and.be.equal("Karl");
          res.body.should.have.property('cheatMode').and.be.equal(true);
          done()
        });
    });
    it('#PUT with "If-Match" > document.$version, the document should be updated and the response body should contain the updated values', function(done){
      // @todo it should not response 405. Whether response body should contain updated params or results[] array?
      request
        .put(url + '/stores/Game Scores/1c9f4c3e-86bb-11e4-b116-123bg3f5daba')
        .send({
          'score': 1876,
          'playerName': "Karl",
          'cheatMode': true
        })
        .set('X-Auth-Token', token)
        .set('If-Match', ifMatch+1) // the last digit is greater by 1
        .accept('json')
        .end(function(res){
          res.status.should.be.equal(412);
          done()
        });
    });
  });

});
