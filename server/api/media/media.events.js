/**
 * Media model events
 */

'use strict';

import {EventEmitter} from 'events';
var Media = require('../../sqldb').Media;
var User = require('../../sqldb').User;
var MediaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MediaEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Media.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Media.findOne({
      where: {
        _id: doc._id
      },
      include: {
        model: User, as: 'user'
      }
    })
    .then( (record) => {
      if(record){
        MediaEvents.emit(event + ':' + record._id, record);
        MediaEvents.emit(event, record);
      } else {
        MediaEvents.emit(event + ':' + doc._id, doc);
        MediaEvents.emit(event, doc);
      }
      done(null);
    })
    .catch( (error) => {
      done(null);
    });
  };
}

export default MediaEvents;
