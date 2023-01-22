const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
const { resolve6 } = require("dns/promises");

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(firstName, lastName, email);



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
};



var jsonData = JSON.stringify(data);
const url = "https://us13.api.mailchimp.com/3.0/lists/a652193865";
const options = {
    method: "POST",
    auth: "pberlia:47eca3a2a40f696d1a169eda70bf56c8-us13"
}

const request = https.request(url, options, function(response) {

    if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    }
    else {
        res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
});



request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});


//API key
//47eca3a2a40f696d1a169eda70bf56c8-us13
//List Id
//a652193865.