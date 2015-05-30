Meteor.publish(null, function () {
  return Texts.find({}, {sort: {time: -1}, limit: 5});
});