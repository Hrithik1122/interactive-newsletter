const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var data ={
      members : [
        {
          email_address:email,
          status : "subscribed",
          merge_fields : {
            FNAME : firstName,
            LNAME : lastName
          }
        }
      ]
    }
    var jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/a1f1c8f499";
    const options = {
      method : "POST",
      auth : "Deepak:0ef571739fc045fa908c6d60eb442bac-us5"

    }
    const request = https.request(url,options,function(response){

      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      } 
      else {
        res.sendFile(__dirname + "/failure.html");
      }
      
    //   response.on("data",function(data){
    //     console.log(JSON.parse(data));
    // });

    });
    
    request.write(jsonData);
    request.end();


    
    

});

app.get("/failure",function(req,res){
  res.redirect("/");

});




app.listen(process.env.PORT || 3000, function(){
    console.log("Server is up and running on port 3000");
});
// List Id
// a1f1c8f499
// API Key
// 0ef571739fc045fa908c6d60eb442bac-us5