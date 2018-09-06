/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/chains              ->  index
 * POST    /api/chains              ->  create
 * GET     /api/chains/:id          ->  show
 * PUT     /api/chains/:id          ->  upsert
 * PATCH   /api/chains/:id          ->  patch
 * DELETE  /api/chains/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Chain} from '../../sqldb';

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

// Gets a list of Chains
export function index(req, res) {
  return Chain.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Chain from the DB
export function show(req, res) {
  return Chain.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Chain in the DB
export function create(req, res) {
  return Chain.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Chain in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Chain.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Chain in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Chain.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Chain from the DB
export function destroy(req, res) {
  return Chain.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
