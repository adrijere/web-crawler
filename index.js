var request = require('request');

function loadUrls() {
var websites = [];
process.argv.forEach(function (val, index, array) {
  if (index >= 2)
    websites.push({"url": val, "language": "", "grade": "0"});
});
  return (websites);
};

function defineLanguage(website) {
  request(website, function(error, response, body) {
    // Check status code (200 is HTTP OK)
    if(response.statusCode === 200) {
      // Check if the website uses Express
      if (response.headers['x-powered-by'] == "Express")
      {
        website.language = "Node";
        website.grade = "5";
      }
      // Check if the website has some special RoR values in the header
      else if (response.headers['etag'] && response.headers['cache-control']) 
      {
        website.language = "Ruby";
        website.grade = "5";
      }
      // If the website is not coded in Node or Ruby
      else
        website.language = "/";
    }
    console.log(website.language +  " (" + website.grade + "/5) " + website.url);
  });
}

function main() {
  var websites = loadUrls();
  console.log("Guess                        URL");
  console.log("--------------------------------------------");
  for (var i = 0; i < websites.length; i++) {
    defineLanguage(websites[i]);
  }
}

main();