var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')

const bodyParser = require('body-parser')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

const textApi = require('aylien_textapi');
const textapi = new textApi({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

console.log(__dirname)

app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/analyze', analyze)

function analyze(req, res) {
    let url = req.body.url
    textapi.combined({
        url: url,
        endpoint: [ 'entities', 'extract', 'summarize', 'sentiment' ]
    }, (err, result) => {
        if(err === null) {            
            res.json(result)            
        } else {
            console.error(err)
            res.json( { error: true} )
        }
    })
}

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})