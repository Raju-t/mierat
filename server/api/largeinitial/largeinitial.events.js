/**
 * Largeinitial model events
 */

'use strict';

import {EventEmitter} from 'events';
var Largeinitial = require('../../sqldb').Largeinitial;
var User = require('../../sqldb').User;
var Media = require('../../sqldb').Media;
var LargeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LargeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Largeinitial.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Largeinitial.findOne({
      where: {
        _id: doc._id
      },
      include: {
        model: User,
        as: 'lastModifiedBy',
        model: Media,
        as: 'media',
        include: {
          model: User,
          as: 'user'
        }
      }
    })
    .then( (record) => {
      if(record){
        LargeEvents.emit(event + ':' + doc._id, record);
        LargeEvents.emit(event, record);
      } else {
        LargeEvents.emit(event + ':' + doc._id, doc);
        LargeEvents.emit(event, doc);
      }
      done(null);  
    })
    .catch( (error) => {
      done(null);
    });
  };
}

export default LargeEvents;
