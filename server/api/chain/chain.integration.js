'use strict';

var app = require('../..');
import request from 'supertest';

var newBook;

describe('Chain API:', function() {
  describe('GET /api/chains', function() {
    var chains;

    beforeEach(function(done) {
      request(app)
        .get('/api/chains')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          chains = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      chains.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/chains', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/chains')
        .send({
          name: 'New Chain',
          info: 'This is the brand new chain!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBook = res.body;
          done();
        });
    });

    it('should respond with the newly created chain', function() {
      newBook.name.should.equal('New Chain');
      newBook.info.should.equal('This is the brand new chain!!!');
    });
  });

  describe('GET /api/chains/:id', function() {
    var chain;

    beforeEach(function(done) {
      request(app)
        .get(`/api/chains/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          chain = res.body;
          done();
        });
    });

    afterEach(function() {
      chain = {};
    });

    it('should respond with the requested chain', function() {
      chain.name.should.equal('New Chain');
      chain.info.should.equal('This is the brand new chain!!!');
    });
  });

  describe('PUT /api/chains/:id', function() {
    var updatedBook;

    beforeEach(function(done) {
      request(app)
        .put(`/api/chains/${newBook._id}`)
        .send({
          name: 'Updated Chain',
          info: 'This is the updated chain!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBook = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBook = {};
    });

    it('should respond with the original chain', function() {
      updatedBook.name.should.equal('New Chain');
      updatedBook.info.should.equal('This is the brand new chain!!!');
    });

    it('should respond with the updated chain on a subsequent GET', function(done) {
      request(app)
        .get(`/api/chains/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let chain = res.body;

          chain.name.should.equal('Updated Chain');
          chain.info.should.equal('This is the updated chain!!!');

          done();
        });
    });
  });

  describe('PATCH /api/chains/:id', function() {
    var patchedBook;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/chains/${newBook._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Chain' },
          { op: 'replace', path: '/info', value: 'This is the patched chain!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBook = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBook = {};
    });

    it('should respond with the patched chain', function() {
      patchedBook.name.should.equal('Patched Chain');
      patchedBook.info.should.equal('This is the patched chain!!!');
    });
  });

  describe('DELETE /api/chains/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/chains/${newBook._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when chain does not exist', function(done) {
      request(app)
        .delete(`/api/chains/${newBook._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
