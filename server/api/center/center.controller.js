/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/centers              ->  index
 * POST    /api/centers              ->  create
 * GET     /api/centers/:id          ->  show
 * PUT     /api/centers/:id          ->  upsert
 * PATCH   /api/centers/:id          ->  patch
 * DELETE  /api/centers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Center} from '../../sqldb';

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

// Gets a list of Centers
export function index(req, res) {
  return Center.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Center from the DB
export function show(req, res) {
  return Center.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Center in the DB
export function create(req, res) {
  return Center.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Center in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Center.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Center in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Center.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Center from the DB
export function destroy(req, res) {
  return Center.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
