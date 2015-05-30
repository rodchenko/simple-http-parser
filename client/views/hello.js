
Session.setDefault('loading', 0);

Template.hello.helpers({
  counter: function () {
    return Session.get('counter');
  },
  obj: function () {
    // return Session.get('text');  
    return Texts.find({},{sort: {time: -1}, limit: 5});
  },
  loading: function() {
    return Session.get('loading');
  }
});