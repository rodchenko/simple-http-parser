if (Meteor.isClient) {
  Template.hello.helpers({
    collection: function () {
      return Texts.find();
    }
  });
}

Texts = new Mongo.Collection('texts');

if (Meteor.isServer) {
  Meteor.startup(function () {

    // faker.locale = "ru";

    var name = faker.name.firstName();
    var surname = faker.name.lastName();

    var image = faker.image.avatar();
    console.log(image);

    HTTP.call(
      "POST",
      "http://www.500letters.org/form_15.php",
      {
        params: {
          'f1_gender': 'male',
          'f1_firstname': name,
          'f1_surname': surname,
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
          var html = cheerio.load(result.content);
          var text = html('.text_container .formdiv').text();
          // console.log(text);
          Texts.insert({"image": image, "text": text, "name": name, "surname": surname, "time": new Date()});
        }
      }
    );

  });
}
