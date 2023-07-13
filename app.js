const express = require("express");

const bodyParser = require("body-parser");
const https = require("https");

const request = require("request");

 const app = express();

 app.use(bodyParser.urlencoded({extended:true}));

 app.use(express.static("public")); // to use files other than the html file


 app.get("/",function (req,res){
    res.sendFile(__dirname + "/signup.html");

 });

 app.post("/",function (req,res){

     const firstname = req.body.firstname;
     const lastname = req.body.lastname;
     const email = req.body.email;

     const data = {
      members: [
         {
            email_address: email,
            status: "subscribed",
            merge_fields: 
            {
               FNAME: firstname,
               LNAME: lastname
            }
         }
      ]
     }

     const jsonData = JSON.stringify(data);

     const url = "https://us17.api.mailchimp.com/3.0/lists/c4fdb3598d" ;

     const options = {
      method : "POST",
      auth :"shivang1:4ce07382d56e6da3cb3ff481a413230d-us17"
     }
     const request =  https.request(url, options, function(response){

       if(response.statusCode === 200){
         res.sendFile( __dirname + "/success.html");
       }
       else
       {
         res.sendFile(__dirname + "/failure.html");
       }

        response.on("data",function(data){

         console.log( JSON.parse(data));

        })

     })
     request.write(jsonData);
     request.end();
   });
   app.post("/failure",function(req,res){
      res.redirect("/");
   });
   app.listen("9000",function (){
      console.log("server got initiated at port 9000");
   });
