const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();


app.use(express.static("public")); //This helps us with static pages
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})



app.post("/", function(req, res) {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

const url = "https://us17.api.mailchimp.com/3.0/lists/3bcafa67a9"

const options = {
  method: "POST",
  auth: "fega1:fa9f19994fd870f4dfcf40ba7b21205df-us17"
}


// Interacting with mailchimp api

const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    }
    else {
      res.sendFile(__dirname + "/failure.html")
    }

      response.on("data", function(data) {
        console.log(JSON.parse(data))
      })
  })

  request.write(jsonData);
  request.end();

});



app.post("/failure", function(req, res) {
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started at port 3000.")
})






// API KEY
// a9f19994fd870f4dfcf40ba7b21205df-us17


//3bcafa67a9
