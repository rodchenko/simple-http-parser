
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

Template.hello.events({
  'click button': function () {
    // var name = $('#artist_name').val();
    // if(name != '') {
      Session.set('loading', 1);
      Meteor.call(
        'generate',
        name,
        function(error, result) {
          // console.log(result);
          if(result != "error") {
            Session.set('loading', 0);
          }
        }
      );
      
    // } else {
    //   Session.set('text', "please enter a name");
    // }
  }
});