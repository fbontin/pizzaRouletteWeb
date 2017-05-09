var express = require('express')
var request = require('request');
//var himalaya = require('himalaya');
var app = express();

app.get('/', function (req, res) {
    //res.send('Hello World!');
    var file = getRelativePath("index.html");
    res.sendFile(file);
})

app.get('/pizza', function(req, res) {
    var url = req.query.url;

    request(url, function(error, response, html) {
        if(!error) {
            pizzas = parseHtml(html);
            res.send("pizza name: " + pizzas);
        }
        else {
            res.send("error occured");
        }
    });
})


app.listen(3000, function () {
    console.log('PizzaRoulette listening on port 3000');
})

function parseHtml(html) {
    var regex = /(?:<h5 class=\"menu-item__title\">)([\w\s]+)(?:<\/h5>)/gm;
    return html.match(regex);
}

function getRelativePath(fileName) {
    var path = require('path');
    return path.join(__dirname, fileName);
}
