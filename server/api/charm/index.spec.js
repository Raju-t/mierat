'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bookCtrlStub = {
  index: 'bookCtrl.index',
  show: 'bookCtrl.show',
  create: 'bookCtrl.create',
  upsert: 'bookCtrl.upsert',
  patch: 'bookCtrl.patch',
  destroy: 'bookCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bookIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './charm.controller': bookCtrlStub
});

describe('Charm API Router:', function() {
  it('should return an express router instance', function() {
    bookIndex.should.equal(routerStub);
  });

  describe('GET /api/charms', function() {
    it('should route to charm.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bookCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/charms/:id', function() {
    it('should route to charm.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bookCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/charms', function() {
    it('should route to charm.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bookCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/charms/:id', function() {
    it('should route to charm.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'bookCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/charms/:id', function() {
    it('should route to charm.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'bookCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/charms/:id', function() {
    it('should route to charm.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bookCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
