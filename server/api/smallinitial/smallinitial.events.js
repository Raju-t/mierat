/**
 * Smallinitial model events
 */

'use strict';

import {EventEmitter} from 'events';
var Smallinitial = require('../../sqldb').Smallinitial;
var User = require('../../sqldb').User;
var Media = require('../../sqldb').Media;
var SmallEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SmallEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Smallinitial.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Smallinitial.findOne({
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
      SmallEvents.emit(event + ':' + doc._id, record);
      SmallEvents.emit(event, record);
      done(null);  
    })
    .catch( (error) => {
      done(null);
    });
  };
}

export default SmallEvents;
