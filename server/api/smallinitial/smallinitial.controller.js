/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/smallinitials              ->  index
 * POST    /api/smallinitials              ->  create
 * GET     /api/smallinitials/:id          ->  show
 * PUT     /api/smallinitials/:id          ->  upsert
 * PATCH   /api/smallinitials/:id          ->  patch
 * DELETE  /api/smallinitials/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import { Smallinitial } from '../../sqldb';
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

// Gets a list of Smallinitials
export function index(req, res) {
  return Smallinitial.findAll({
    include: mediaUser
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Smallinitial from the DB
export function show(req, res) {
  return Smallinitial.find({
    where: {
      _id: req.params.id
    },
    include: mediaUser
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Smallinitial in the DB
export function create(req, res) {
  if(req.user && req.user._id){
    req.body.lastModifiedBy = req.user._id;
  }
  return Smallinitial.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Smallinitial in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Smallinitial.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Smallinitial in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  if(req.user && req.user._id){
    req.body.lastModifiedBy = req.user._id;
  }
  return Smallinitial.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Smallinitial from the DB
export function destroy(req, res) {
  return Smallinitial.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
