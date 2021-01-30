var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());

io.on('connection', function(socket) {
    console.log(socket.id);
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on("user", function(msg) {
        console.log("user:" + JSON.stringify(msg));
    });
});

app.get("/", function(req, res) {
    res.status(200);
    res.send("OK");
    res.end();
});

app.post('/push', function(req, res) {
    var query = req.query;
    if (!query.hasOwnProperty("channel")) {
        res.status(400);
        res.contentType('application/json');
        res.send({
            message: "channel undefined"
        });
        res.end();
        return;
    }
    var channel = query.channel;
    var body = req.body;
    if (body == undefined) {
        res.status(400);
        res.contentType('application/json');
        res.send({
            message: "json body is empty"
        });
        res.end();
        return;
    }
    io.emit(channel, body);
    res.contentType('application/json');
    res.send(body);
    res.end();
});

http.listen(4321, function() {
    console.log('listening on *:4321');
});