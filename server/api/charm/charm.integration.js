'use strict';

var app = require('../..');
import request from 'supertest';

var newBook;

describe('Charm API:', function() {
  describe('GET /api/charms', function() {
    var charms;

    beforeEach(function(done) {
      request(app)
        .get('/api/charms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          charms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      charms.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/charms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/charms')
        .send({
          name: 'New Charm',
          info: 'This is the brand new charm!!!'
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

    it('should respond with the newly created charm', function() {
      newBook.name.should.equal('New Charm');
      newBook.info.should.equal('This is the brand new charm!!!');
    });
  });

  describe('GET /api/charms/:id', function() {
    var charm;

    beforeEach(function(done) {
      request(app)
        .get(`/api/charms/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          charm = res.body;
          done();
        });
    });

    afterEach(function() {
      charm = {};
    });

    it('should respond with the requested charm', function() {
      charm.name.should.equal('New Charm');
      charm.info.should.equal('This is the brand new charm!!!');
    });
  });

  describe('PUT /api/charms/:id', function() {
    var updatedBook;

    beforeEach(function(done) {
      request(app)
        .put(`/api/charms/${newBook._id}`)
        .send({
          name: 'Updated Charm',
          info: 'This is the updated charm!!!'
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

    it('should respond with the original charm', function() {
      updatedBook.name.should.equal('New Charm');
      updatedBook.info.should.equal('This is the brand new charm!!!');
    });

    it('should respond with the updated charm on a subsequent GET', function(done) {
      request(app)
        .get(`/api/charms/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let charm = res.body;

          charm.name.should.equal('Updated Charm');
          charm.info.should.equal('This is the updated charm!!!');

          done();
        });
    });
  });

  describe('PATCH /api/charms/:id', function() {
    var patchedBook;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/charms/${newBook._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Charm' },
          { op: 'replace', path: '/info', value: 'This is the patched charm!!!' }
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

    it('should respond with the patched charm', function() {
      patchedBook.name.should.equal('Patched Charm');
      patchedBook.info.should.equal('This is the patched charm!!!');
    });
  });

  describe('DELETE /api/charms/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/charms/${newBook._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when charm does not exist', function(done) {
      request(app)
        .delete(`/api/charms/${newBook._id}`)
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
