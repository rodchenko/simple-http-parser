if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('text', '');

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    text: function () {
      return Session.get('text');
    }
  });

  Template.hello.events({
    'click button': function () {
      Meteor.call(
        'parse', 
        function(error, result) {
          // console.log(result);
          if(result != "error") {
            Session.set('text', result);
          }
        }
      );
    }
  });
}

if (Meteor.isServer) {
  //Meteor.startup(function () {
  Meteor.methods({
    parse: function() {
      var result = HTTP.call(
        "POST",
        "http://www.500letters.org/form_15.php",
        {
          params: {
            'f1_gender': 'male',
            'f1_firstname': 'plus',
            'f1_surname': 'minus',
            'f1_birthyear': 2000+Math.floor(Math.random()*10),
            'f1_birthCity': '',
            'f1_country': '2',
            'f1_workplaceCity': '',
            'f4_theme': ['Abstraction'],
            'generate_bio': 'Generate artist text',
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }
      ); 
      if(result) {
        // console.log(result.content);
        var $ = cheerio.load(result.content);
        // console.log($('.text_container > .formdiv').text());
        return $('.text_container > .formdiv').text();
      }
      return "error";
    }
  });


  //});
}
