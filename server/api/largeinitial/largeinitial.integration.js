'use strict';

var app = require('../..');
import request from 'supertest';

var newBook;

describe('Largeinitial API:', function() {
  describe('GET /api/largeinitials', function() {
    var largeinitials;

    beforeEach(function(done) {
      request(app)
        .get('/api/largeinitials')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          largeinitials = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      largeinitials.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/largeinitials', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/largeinitials')
        .send({
          name: 'New Largeinitial',
          info: 'This is the brand new largeinitial!!!'
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

    it('should respond with the newly created largeinitial', function() {
      newBook.name.should.equal('New Largeinitial');
      newBook.info.should.equal('This is the brand new largeinitial!!!');
    });
  });

  describe('GET /api/largeinitials/:id', function() {
    var largeinitial;

    beforeEach(function(done) {
      request(app)
        .get(`/api/largeinitials/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          largeinitial = res.body;
          done();
        });
    });

    afterEach(function() {
      largeinitial = {};
    });

    it('should respond with the requested largeinitial', function() {
      largeinitial.name.should.equal('New Largeinitial');
      largeinitial.info.should.equal('This is the brand new largeinitial!!!');
    });
  });

  describe('PUT /api/largeinitials/:id', function() {
    var updatedBook;

    beforeEach(function(done) {
      request(app)
        .put(`/api/largeinitials/${newBook._id}`)
        .send({
          name: 'Updated Largeinitial',
          info: 'This is the updated largeinitial!!!'
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

    it('should respond with the original largeinitial', function() {
      updatedBook.name.should.equal('New Largeinitial');
      updatedBook.info.should.equal('This is the brand new largeinitial!!!');
    });

    it('should respond with the updated largeinitial on a subsequent GET', function(done) {
      request(app)
        .get(`/api/largeinitials/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let largeinitial = res.body;

          largeinitial.name.should.equal('Updated Largeinitial');
          largeinitial.info.should.equal('This is the updated largeinitial!!!');

          done();
        });
    });
  });

  describe('PATCH /api/largeinitials/:id', function() {
    var patchedBook;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/largeinitials/${newBook._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Largeinitial' },
          { op: 'replace', path: '/info', value: 'This is the patched largeinitial!!!' }
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

    it('should respond with the patched largeinitial', function() {
      patchedBook.name.should.equal('Patched Largeinitial');
      patchedBook.info.should.equal('This is the patched largeinitial!!!');
    });
  });

  describe('DELETE /api/largeinitials/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/largeinitials/${newBook._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when largeinitial does not exist', function(done) {
      request(app)
        .delete(`/api/largeinitials/${newBook._id}`)
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
