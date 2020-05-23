const express = require('express');
const app = express();
const fs = require("fs");

app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        const users = JSON.parse(data);
        const user = users["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
})

const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
