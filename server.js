const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({
        extended: true
}));    
app.use(bodyParser.json());
app.use(express.static("./views"));

app.post("/chatMessage", function (req, res) {
     console.log(req.body)
});

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/views/index.html");
    });

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on port ${port}`)
})