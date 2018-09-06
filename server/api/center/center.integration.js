'use strict';

var app = require('../..');
import request from 'supertest';

var newBook;

describe('Center API:', function() {
  describe('GET /api/centers', function() {
    var centers;

    beforeEach(function(done) {
      request(app)
        .get('/api/centers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          centers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      centers.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/centers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/centers')
        .send({
          name: 'New Center',
          info: 'This is the brand new center!!!'
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

    it('should respond with the newly created center', function() {
      newBook.name.should.equal('New Center');
      newBook.info.should.equal('This is the brand new center!!!');
    });
  });

  describe('GET /api/centers/:id', function() {
    var center;

    beforeEach(function(done) {
      request(app)
        .get(`/api/centers/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          center = res.body;
          done();
        });
    });

    afterEach(function() {
      center = {};
    });

    it('should respond with the requested center', function() {
      center.name.should.equal('New Center');
      center.info.should.equal('This is the brand new center!!!');
    });
  });

  describe('PUT /api/centers/:id', function() {
    var updatedBook;

    beforeEach(function(done) {
      request(app)
        .put(`/api/centers/${newBook._id}`)
        .send({
          name: 'Updated Center',
          info: 'This is the updated center!!!'
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

    it('should respond with the original center', function() {
      updatedBook.name.should.equal('New Center');
      updatedBook.info.should.equal('This is the brand new center!!!');
    });

    it('should respond with the updated center on a subsequent GET', function(done) {
      request(app)
        .get(`/api/centers/${newBook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let center = res.body;

          center.name.should.equal('Updated Center');
          center.info.should.equal('This is the updated center!!!');

          done();
        });
    });
  });

  describe('PATCH /api/centers/:id', function() {
    var patchedBook;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/centers/${newBook._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Center' },
          { op: 'replace', path: '/info', value: 'This is the patched center!!!' }
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

    it('should respond with the patched center', function() {
      patchedBook.name.should.equal('Patched Center');
      patchedBook.info.should.equal('This is the patched center!!!');
    });
  });

  describe('DELETE /api/centers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/centers/${newBook._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when center does not exist', function(done) {
      request(app)
        .delete(`/api/centers/${newBook._id}`)
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
