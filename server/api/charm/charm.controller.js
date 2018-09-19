/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/charms              ->  index
 * POST    /api/charms              ->  create
 * GET     /api/charms/:id          ->  show
 * PUT     /api/charms/:id          ->  upsert
 * PATCH   /api/charms/:id          ->  patch
 * DELETE  /api/charms/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import { Charm } from '../../sqldb';
import { mediaUser } from '../../sqldb/includes';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      _.extend(entity, patches);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Charms
export function index(req, res) {
  return Charm.findAll({
    include: mediaUser
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Charm from the DB
export function show(req, res) {
  return Charm.find({
    where: {
      _id: req.params.id
    },
    include: mediaUser
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Charm in the DB
export function create(req, res) {
  if(req.user && req.user._id){
    req.body.lastModifiedBy = req.user._id;
  }
  if(req.body.price){
    req.body.price = Number(req.body.price).toFixed(2);
  }
  return Charm.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Charm in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Charm.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Charm in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  if(req.user && req.user._id){
    req.body.lastModifiedBy = req.user._id;
  }
  if(req.body.price){
    req.body.price = Number(req.body.price).toFixed(2);
  }
  return Charm.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Charm from the DB
export function destroy(req, res) {
  return Charm.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
