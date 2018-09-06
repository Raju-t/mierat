'use strict';

var app = require('../..');
import request from 'supertest';

var newBook;

describe('Smallinitial API:', function() {
  describe('GET /api/smallinitials', function() {
    var smallinitials;

    beforeEach(function(done) {
      request(app)
        .get('/api/smallinitials')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          smallinitials = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      smallinitials.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/smallinitials', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/smallinitials')
        .send({
          name: 'New Smallinitial',
          info: 'This is the brand new smallinitial!!!'
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

    it('should respond with the newly created smallinitial', function() {
      newBook.name.should.equal('New Smallinitial');
      newBook.info.should.equal('This is the brand new smallinitial!!!');
    });
  });

  describe('GET /api/smallinitials/:id', function() {
    var smallinitial;

    beforeEach(function(done) {
      request(app)
        .get(`/api/smallinitials/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          smallinitial = res.body;
          done();
        });
    });

    afterEach(function() {
      smallinitial = {};
    });

    it('should respond with the requested smallinitial', function() {
      smallinitial.name.should.equal('New Smallinitial');
      smallinitial.info.should.equal('This is the brand new smallinitial!!!');
    });
  });

  describe('PUT /api/smallinitials/:id', function() {
    var updatedBook;

    beforeEach(function(done) {
      request(app)
        .put(`/api/smallinitials/${newBook._id}`)
        .send({
          name: 'Updated Smallinitial',
          info: 'This is the updated smallinitial!!!'
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

    it('should respond with the original smallinitial', function() {
      updatedBook.name.should.equal('New Smallinitial');
      updatedBook.info.should.equal('This is the brand new smallinitial!!!');
    });

    it('should respond with the updated smallinitial on a subsequent GET', function(done) {
      request(app)
        .get(`/api/smallinitials/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let smallinitial = res.body;

          smallinitial.name.should.equal('Updated Smallinitial');
          smallinitial.info.should.equal('This is the updated smallinitial!!!');

          done();
        });
    });
  });

  describe('PATCH /api/smallinitials/:id', function() {
    var patchedBook;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/smallinitials/${newBook._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Smallinitial' },
          { op: 'replace', path: '/info', value: 'This is the patched smallinitial!!!' }
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

    it('should respond with the patched smallinitial', function() {
      patchedBook.name.should.equal('Patched Smallinitial');
      patchedBook.info.should.equal('This is the patched smallinitial!!!');
    });
  });

  describe('DELETE /api/smallinitials/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/smallinitials/${newBook._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when smallinitial does not exist', function(done) {
      request(app)
        .delete(`/api/smallinitials/${newBook._id}`)
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
