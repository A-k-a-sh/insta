
const express = require('express');
const app = express();

const path = require("path");

const port = 8080;

app.set("view engine" , "ejs") ;//express by default require ejs

//const externalMediaPath = path.resolve("/Volumes/AKASH(32)/others/ppp/'on vid'"); //not working

//app.use('/external-media', express.static(externalMediaPath)); //not working :(


// Middleware to serve static files:

app.use(express.static(path.join(__dirname, 'public'))); // for file like video img(now in public named folder) and the source in html will be /filename


app.set('public' , path.join(__dirname , 'public'));
app.set("views" , path.join(__dirname , "views")); // to use nodemon outside of this folder



// Function to get the local IP address
const os = require('os');

function getLocalIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        for (const address of addresses) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback to localhost
}




//console.log(__dirname);

app.get('/' , (req , res) => {
    //res.send("Success")
    res.render('home.ejs');
})

app.get('/rolldice' , (req , res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render('rolldice.ejs' , {diceVal})
})

app.get('/insta/:username' , (req , res) => {
    let username = req.params.username;
    let followers = ["adam" , 'bob' , 'steve']
    res.render('insta.ejs' , {username , followers});
})


app.get('/instragram/:username' , (req , res) => {
    // console.log('req received');
    const localIpAddress = getLocalIpAddress();


    // console.log(localIpAddress);
    const {username} = req.params;
    const instaData = require("./insta_data.json");
    //console.log(instaData);
    const data = instaData[username];
    if(data) res.render("instragram.ejs" , {data , localIpAddress});
    else res.send("<h1>No such page found :) </h1>")
})

app.listen(port , () =>{
    console.log(`App started at port: ${port}`);
})

app.get('*' , (req , res) => {
    res.send("Not Found");
})