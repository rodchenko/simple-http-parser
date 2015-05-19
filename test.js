// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);

//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });

//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 10);
//     }
//   });
// }

if (Meteor.isServer) {
  Meteor.startup(function () {

    HTTP.call(
      "POST",
      "http://www.500letters.org/form_15.php",
      {
        params: {
          'f1_gender': 'male',
          'f1_firstname': 'plus',
          'f1_surname': 'minus',
          'f1_birthyear': '2007',
          'f1_birthCity': '',
          'f1_country': '2',
          'f1_workplaceCity': '',
          'f4_theme': ['Abstraction'],
          'generate_bio': 'Generate artist text',
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      },
      function (error, result) {
        if(!error) {
          // console.log(result.content);
          var $ = cheerio.load(result.content);
          console.log($('.text_container > .formdiv').text());
        }
      }
    );

  });
}
