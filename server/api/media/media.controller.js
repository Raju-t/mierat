/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /media              ->  index
 * POST    /media              ->  create
 * GET     /media/:id          ->  show
 * PUT     /media/:id          ->  upsert
 * PATCH   /media/:id          ->  patch
 * DELETE  /media/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import { Media, User } from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _.extend(entity, patches);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          const fs = require('fs');
          fs.unlink('client/' + entity.path, (err) => {
            if (err) { }
          });
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Medias
export function index(req, res) {
  var q = { uemail: req.user.email }
  if (req.user.role === 'admin')
    q = {}
  // return Media.findAll(q)
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));

  return Media.findAll({
    include: {
      model: User,
      as: 'user'
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Media from the DB
export function show(req, res) {
  return Media.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Media in the DB
export function create(req, res) {
  req.files.file.uid = req.user._id
  req.files.file.uname = req.user.name
  req.files.file.uemail = req.user.email
  req.files.file.path = req.files.file.path.replace("client\\", "").replace('client/', '').replace('client//', '');
  req.files.file.user_id = req.user._id
  return Media.create(req.files.file)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Creates a new Media in the DB
export function updateProfile(req, res) {
  req.files.file.uid = req.user._id
  req.files.file.uname = req.user.name
  req.files.file.uemail = req.user.email
  req.files.file.path = req.files.file.path.replace("client\\", "").replace('client/', '').replace('client//', '');
  req.body.avatar = req.files.file.path.replace("client\\", "").replace('client/', '').replace('client//', '');
  return Media.create(req.files.file)
    .then(function () {
      return User.findById(req.user._id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
    })
    .catch(handleError(res));
}
// Upserts the given Media in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.uid = req.user._id
  req.body.uname = req.user.name
  req.body.uemail = req.user.email
  return Media.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true })

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Media in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.uid = req.user._id
  req.body.uname = req.user.name
  req.body.uemail = req.user.email
  return Media.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Media from the DB
export function destroy(req, res) {
  return Media.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
