/**
 * Chain model events
 */

'use strict';

import {EventEmitter} from 'events';
var Chain = require('../../sqldb').Chain;
var User = require('../../sqldb').User;
var Media = require('../../sqldb').Media;
var ChainEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChainEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Chain.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Chain.findOne({
      where: {
        _id: doc._id
      },
      include: {
        model: Media,
        as: 'media',
        include: {
          model: User,
          as: 'user'
        }
      }
    })
    .then( (record) => {
      ChainEvents.emit(event + ':' + doc._id, record);
      ChainEvents.emit(event, record);
      done(null);  
    })
    .catch( (error) => {
      done(null);
    });
  };
}

export default ChainEvents;
