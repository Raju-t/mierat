/**
 * Center model events
 */

'use strict';

import {EventEmitter} from 'events';
var Center = require('../../sqldb').Center;
import { mediaUser } from '../../sqldb/includes';
var CenterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CenterEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Center.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Center.findOne({
      where: {
        _id: doc._id
      },
      include: mediaUser
    })
    .then( (record) => {
      if(record){
        CenterEvents.emit(event + ':' + doc._id, record);
        CenterEvents.emit(event, record);
      } else {
        CenterEvents.emit(event + ':' + doc._id, doc);
        CenterEvents.emit(event, doc);
      }
      done(null);  
    })
    .catch( (error) => {
      done(null);
    });
  };
}

export default CenterEvents;
