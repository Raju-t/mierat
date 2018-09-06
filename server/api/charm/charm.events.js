/**
 * Charm model events
 */

'use strict';

import {EventEmitter} from 'events';
var Charm = require('../../sqldb').Charm;
var CharmEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CharmEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Charm.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CharmEvents.emit(event + ':' + doc._id, doc);
    CharmEvents.emit(event, doc);
    done(null);
  };
}

export default CharmEvents;
