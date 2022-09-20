const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res) => {
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.emailAdd);

  const data = {
    members : [
      {
        email_address : req.body.emailAdd,
        email_type :  "html",
        status : "subscribed",
        merge_fields : {
          FNAME : req.body.firstName,
          LNAME : req.body.lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us11.api.mailchimp.com/3.0/lists/5e516d5aa7";
  const options = {
    method: "POST",
    auth: "nazim:3cf1fbf244eb518c2c3487d5bc5e9915-us11"
  }
  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(3000, () => console.log("Server is running!"));


//mail chimp api key: 3cf1fbf244eb518c2c3487d5bc5e9915-us11
//mail chimp postman ping test:
// https://us11.api.mailchimp.com/3.0/ping?apikey=3cf1fbf244eb518c2c3487d5bc5e9915-us11

// mail chimp audience id: 5e516d5aa7



// "https://us11.api.mailchimp.com/3.0/lists/$list_id/members?apikey=3cf1fbf244eb518c2c3487d5bc5e9915-us11"
