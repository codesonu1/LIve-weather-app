const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/" , function (req , res) {
    
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req , res ){
const q = req.body.cityName;
const apikey = "b4456aee417e4af7b3ead75580938b02";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&appid=" + apikey  + "&units=metric";


https.get(url , function(response){
    console.log(response.code);
    response.on("data" , function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;

        // const icon = weatherData.weather[0].icon;
        // const imageUrl =  "http://openweathermap.org/img/wn/"+ icon + "@2x.png"   
        res.write("<h1>"+q+"</h1>")
        res.write("<h1>"+ "Temperature"+":"+temp+"</h1>");
        res.write("<h1>"+"Cloud"+":"+weatherDesc+"</h1>");
        // res.write("the temperature of "+ q  +" is " + temp + "oC" + "" + "" + "and the cloud is " + "" + weatherDesc);
        // res.write("<img src=" + icon + ">");

        res.send();
    });

});

})





app.listen(3000 , function(){
    console.log("the server is running...........")
})