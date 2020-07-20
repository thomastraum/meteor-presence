import {Meteor} from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
import { _ } from 'meteor/underscore';

var connections = {};

var expire = function(id) {
  Presences.remove(id);
  // console.log(Presences.find().count());
  delete connections[id];
};

var tick = function(id) {
  console.log('tick');
  connections[id].lastSeen = Date.now();
};

Meteor.startup(function() {
  Presences.remove({});
});

Meteor.onConnection(function(connection) {
  console.log('connectionId: ' + connection.id);
  Presences.insert({ _id: connection.id });

  connections[connection.id] = {};
  tick(connection.id);

  connection.onClose(function() {
    console.log('connection closed: ' + connection.id);
    expire(connection.id);
  });
});

Meteor.methods({
  presenceTick: function() {
    check(arguments, [Match.Any]);
    if (this.connection && connections[this.connection.id])
      tick(this.connection.id);
  }
});

Meteor.setInterval(function() {
  _.each(connections, function(connection, id) {
    if (connection.lastSeen < (Date.now() - 10000))
      expire(id);
  });
}, 5000);
