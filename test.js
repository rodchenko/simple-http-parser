if (Meteor.isClient) {
  // counter starts at 0
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
          'parse', name,
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
}

Texts = new Mongo.Collection('texts');

if (Meteor.isServer) {
  //Meteor.startup(function () {
  Meteor.methods({
    parse: function(fullname) {
       console.log("ok");
      // if(fullname!='') {
      //   var f = fullname.split(' ');
      //   var name = f[0];
      //   var surname = f[1];
      //   if(typeof surname == 'undefined') 
      //     surname = "test";

       //console.log('name', name);
        var name = faker.name.firstName();
        var surname = faker.name.lastName();
        var avatarint = faker.internet.avatar();
        console.log('name', name);
        console.log('surname', surname);
        var result = HTTP.call(
          "POST",
          "http://www.500letters.org/form_15.php",
          {
            params: {
              'f1_gender': random_gender(),
              'f1_country': random_country(),
              'f1_firstname': name,
              'f1_surname': surname,
              'f1_birthyear': 1980+Math.floor(Math.random()*10),
              'f1_birthCity': '',
              'f1_country': '2',
              'f1_workplaceCity': '',
              'f3_mainMedia': random_media(),
              'f3_otherMedia': random_othermedia(),
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
          var text = $('.text_container > .formdiv').text();
          Texts.insert({
            "text": text, 
            "name": name, 
            "surname": surname, 
            "avatar": {
              "im": avatarIm, 
              "int": avatarInt
           },
            "time": new Date()
          });
          return;
        }
      // }
      return "error";
    }
  });
  
  function random_gender() {
    var array = ["male", "female"];
    console.log('gender', array[Math.floor(Math.random()*array.length)]);
    return array[Math.floor(Math.random()*array.length)];
  }

  function random_country() {
    var array = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Cayman Islands",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands",
      "Colombia",
      "Comoros",
      "Congo",
      "Congo",
      "Cook Islands",
      "Costa Rica",
      "Cote D'ivoire",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands (Malvinas)",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-bissau",
      "Guyana",
      "Haiti",
      "Heard Island and Mcdonald Islands",
      "Holy See (Vatican City State)",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea",
      "Korea",
      "Kuwait",
      "Kyrgyzstan",
      "Lao People's Democratic Republic",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libyan Arab Jamahiriya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macao",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestinian Territory",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "Saint Helena",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Pierre and Miquelon",
      "Saint Vincent and The Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and The South Sandwich Islan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Svalbard and Jan Mayen",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor-leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "United States Minor Outlying Islands",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Viet Nam",
      "Virgin Islands",
      "Wallis and Futuna",
      "Western Sahara",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ];

    console.log('country', array[Math.floor(Math.random()*array.length)]);
    return array[Math.floor(Math.random()*array.length)];
  }

  function random_media() {
    var array = ["Painting", "Photography", "Drawing", "Sculpture", "Film", "Media art", "Installations", "Mixed media", "Conceptual"];
    console.log('mainmedia', array[Math.floor(Math.random()*array.length)]);
    return array[Math.floor(Math.random()*array.length)];
  }

  function random_othermedia() {
    var array = ["Painting", "Photography", "Drawing", "Sculpture", "Film", "Media art", "Installations", "Mixed media", "Conceptual"];
    console.log('othermedia', array[Math.floor(Math.random()*array.length)]);
    return array[Math.floor(Math.random()*array.length)];
  }

  function random_theme() {
    var themes = ["Abstraction","Aesthetics", "Alienation", "Appropriation", "Archive", "Chance", "Concept"];
    // return [themes[];
    var array = getRandomArrayElements(themes, Math.floor(Math.random()*themes.length-1)+1 );
    console.log('theme', array);
    return array;
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
