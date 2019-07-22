var express = require('express');
var moment = require('moment');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

app.use(express.static('public'));

var gameRunning = true;
var gameSecs = 0;
var gameMins = 0;

var startDate = new Date();



io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });

   socket.on("socket-query-active", ()=>{
      if(gameRunning){
        console.log("Game state queried, returning TRUE");
        socket.emit("result-socket-query-active", activeGameJSON);
      } else {
        console.log("Game state queried, returning FALSE");
        socket.emit("result-socket-query-active", null);
      }
   });

   socket.on("socket-query-time", ()=>{
      let diff = Math.abs(new Date() - startDate);
      socket.emit("result-socket-query-time", {
         game : true,
         time : diff
      });

   });

   socket.on("socket-query-advance", ()=>{
    activeGameJSON["active-event-index"] = activeGameJSON["active-event-index"] + 1;
    socket.emit("result-socket-query-active", activeGameJSON);
   });


   socket.on("socket-query-sponsor-message", (data)=>{
    
      let index = activeGameJSON["active-event-index"];
      activeGameJSON.sequence.splice(index, 0, sponsorMessages[data.index]);
      // activeGameJSON["active-event-index"] = activeGameJSON["active-event-index"] + 1;
      socket.emit("result-socket-query-active", activeGameJSON);
   });

   socket.on("socket-query-sticker", (data)=>{
    
   });


   socket.on("socket-query-other", (data)=>{
    
   });

   socket.on("socket-query-cancel-game", ()=>{
      gameRunning = false;
      socket.emit("result-socket-query-active", null);
   });

   socket.on("socket-query-start-game", ()=>{
      gameRunning = true;
      startDate = new Date();
      activeGameJSON["active-event-index"] = 1;
      socket.emit("result-socket-query-active", activeGameJSON);
   });


});


http.listen(3000, function() {
   console.log('listening on *:3000');
});


var sponsorMessages = [
  {
    "action":"sponsorMessage"
  },
  {
    "action":"sponsorMessage"
  },
  {
    "action":"sponsorMessage"
  }
];

var activeGameJSON = 
 {
         "name" : "My Quiz Template",
         "any-other-data" : {},
         "start-events" : [],
         "active-event-index" : 1,
         "sequence" : 
         [
              {
                "dt":0,
                "action":"getGameData"
              },
              {
                "dt":2,
                "action":"showLobby",
                "timeout":50
              },
              {
                "dt":10,
                "action":"startCountdown",
                "start":40,
                "end":13,
                "animStart":10
              },
              {
                "dt":40,
                "action":"startVideoStream"
              },
              {
                "_dt":2,
                "dt":100,
                "action":"question",
                "question" : "This is the question text",
                "qNo":0,
                "timeout":10,
                "key":"FUYGIHLISJ"
              },
              {
                "dt":17,
                "action":"answer",
                "timeout":8,
                "qNo":0,
                "aNo":2,
                "split": [ 1234, 543, 18123 ]
              },
              {
                "dt":13,
                "action":"question",
                "question" : "This is the question text",
                "qNo":1,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":16,
                "action":"answer",
                "qNo":1,
                "timeout":8,
                "aNo":2,
                "split": [ 120, 2, 18001 ]
              },
              {
                "dt":13,
                "action":"question",
                "question" : "This is the question text",
                "qNo":2,
                "timeout":10,
                "key":"FUYGIHLISJ"
              },
              {
                "dt":19,
                "action":"answer",
                "timeout":8,
                "qNo":2,
                "aNo":2,
                "split": [ 1002, 1210, 15789 ]
              },
              {
                "dt":12,
                "action":"question",
                "question" : "This is the question text",
                "qNo":3,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":17,
                "action":"answer",
                "qNo":3,
                "timeout":5,
                "aNo":1,
                "split": [ 2506, 12043, 1240 ]
              },
              {
                "dt":8,
                "action":"question",
                "question" : "This is the question text",
                "qNo":4,
                "timeout":10,
                "key":"FUYGIHLISJ"
              },
              {
                "dt":16,
                "action":"answer",
                "timeout":8,
                "qNo":4,
                "aNo":1,
                "split": [ 4009, 7654, 380 ]
              },
              {
                "dt":17,
                "action":"question",
                "question" : "This is the question text",
                "qNo":5,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":17,
                "action":"answer",
                "qNo":5,
                "timeout":8,
                "aNo":0,
                "split": [ 6008, 1006, 640 ]
              },
              {
                "dt":45,
                "action":"question",
                "question" : "This is the question text",
                "qNo":6,
                "timeout":10,
                "key":"FUYGIHLISJ"
              },
              {
                "dt":13,
                "action":"answer",
                "timeout":8,
                "qNo":6,
                "aNo":1,
                "split": [ 4820, 1180, 8 ]
              },
              {
                "dt":17,
                "action":"question",
                "question" : "This is the question text",
                "qNo":7,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":15,
                "action":"answer",
                "qNo":7,
                "timeout":8,
                "aNo":1,
                "split": [ 0, 1100, 80 ]
              },
              {
                "dt":17,
                "action":"question",
                "question" : "This is the question text",
                "qNo":8,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":16,
                "action":"answer",
                "qNo":8,
                "timeout":8,
                "aNo":1,
                "split": [ 20, 1056, 24 ]
              },
              {
                "dt":24,
                "action":"question",
                "question" : "This is the question text",
                "qNo":9,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":15,
                "action":"answer",
                "qNo":9,
                "timeout":8,
                "aNo":0,
                "split": [ 1053, 2, 1 ]
              },
              {
                "dt":16,
                "action":"question",
                "question" : "This is the question text",
                "qNo":10,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":16,
                "action":"answer",
                "qNo":10,
                "timeout":8,
                "aNo":2,
                "split": [ 410, 40, 603 ]
              },
              {
                "dt":18,
                "action":"question",
                "question" : "This is the question text",
                "qNo":11,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":16,
                "action":"answer",
                "qNo":11,
                "timeout":8,
                "aNo":1,
                "split": [ 60, 462, 81 ]
              },
              {
                "dt":30,
                "action":"question",
                "question" : "This is the question text",
                "qNo":12,
                "timeout":10,
                "key":"VNBVJHGYTDFJK"
              },
              {
                "dt":16,
                "action":"answer",
                "qNo":12,
                "timeout":8,
                "aNo":2,
                "split": [ 402, 40, 10 ]
              },
              {
                "dt":8,
                "action":"winners",
                "iWon":false,
                "winners": [
                  "id1",
                  "id2",
                  "id3"
                ]
              },
              {
              "dt":40,
              "action":"endGame"
              }
         ]
 }