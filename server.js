var express = require('express')

var app = express();

app.get('/', function (req, res) {
    res.send('Welcome to the Timestamp microservice')
})


app.get('/:date', function (req, res) {
    var params = req.params.date

    if (Number.isInteger(parseInt(params))) {
        var milliseconds = params * 1000;
        var date = new Date (milliseconds)
        var json = {
            'unix': params,
            'natural': date.toDateString()
        }
        console.log(JSON.stringify(json))
        res.json(json)
    
    } else {
        var naturalDate = new Date(params)
        if (naturalDate.toDateString() !== 'Invalid Date') {
            var unix = naturalDate.getTime() / 1000
            var json = {
                'unix': unix,
                'natural': naturalDate.toDateString()
            }
            res.json(json)
        } else {
            res.json({ 'unix': null, 'natural': null })
        }
    }
})

app.listen('8080')