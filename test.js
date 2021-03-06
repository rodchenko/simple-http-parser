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
      var name = $('#artist_name').val();
      if(name != '') {
        Meteor.call(
          'parse', name,
          function(error, result) {
            // console.log(result);
            if(result != "error") {
              Session.set('text', result);
            }
          }
        );
        
      } else {
        Session.set('text', "please enter a name");
      }
    }
  });
}

if (Meteor.isServer) {
  //Meteor.startup(function () {
  Meteor.methods({
    parse: function(fullname) {

      if(fullname!='') {
        var f = fullname.split(' ');
        var name = f[0];
        var surname = f[1];
        if(typeof surname == 'undefined') 
          surname = "test";

        // console.log('name', name);
        var result = HTTP.call(
          "POST",
          "http://www.500letters.org/form_15.php",
          {
            params: {
              'f1_gender': 'male',
              'f1_firstname': name,
              'f1_surname': surname,
              'f1_birthyear': 1980+Math.floor(Math.random()*10),
              'f1_birthCity': '',
              'f1_country': '2',
              'f1_workplaceCity': '',
              'f3_mainMedia': random_media(),
              'f4_theme': random_theme(),
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
      }
      return "error";
    }
  });
  
  function random_theme() {
    var themes = ["Abstraction","Aesthetics", "Alienation", "Appropriation", "Archive", "Chance", "Concept"];
    // return [themes[];
    var array = getRandomArrayElements(themes, Math.floor(Math.random()*themes.length-1)+1 );
    console.log('array', array);
    return array;
  }

  function random_media() {
    var array = ["Painting", "Photography", "Drawing", "Sculpture", "Performance", "Media art", "Installations"];
    console.log('mix', array[Math.floor(Math.random()*array.length)]);
    return array[Math.floor(Math.random()*array.length)];
  }

  function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }

  //});
}
