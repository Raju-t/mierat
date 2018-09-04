import twilio from 'twilio';
import _ from 'lodash';

const path = require('path');
import env from './../config/environment';
import * as config from './../config/environment/shared';
import * as mailer from './../api/sendmail/send';
import User from './../api/user/user.model';


function isObject(o) {
  return null != o &&
    typeof o === 'object' &&
    Object.prototype.toString.call(o) === '[object Object]';
}

export function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

export function patchUpdates(patches) {
  return function(entity) {
    try {
      entity = _.extend(entity, patches);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

export function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

export function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

export function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}
