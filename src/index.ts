import express = require("express");
import cors = require("cors");
import { PORT } from "./config/constants";


import http from "http";
import { Server } from "socket.io";
import { emit } from "process";


const app = express();
//
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(parseInt(PORT as string), () =>
  console.log(`Running on http://localhost:${PORT}`)
);

//

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let waitTime = 5
console.log(waitTime)
let questionDuration: number = 10

let currentQuiz: any //il sera initialiser currentQuiz.duration
let numberOfquestion: number
let rankOfQuestion: number
io.on("connection", (socket) => {

  if (currentQuiz && waitTime == 5) {
    currentQuiz.question.duration = waitTime
    currentQuiz.question.duration = questionDuration
  }
  else if (currentQuiz && waitTime != 5) {
    currentQuiz.question.duration = questionDuration
    currentQuiz.waitTime = waitTime
    currentQuiz.numberOfquestion = numberOfquestion
    currentQuiz.rankOfQuestion = rankOfQuestion
    console.log("welcommme", currentQuiz)
    socket.emit("welcome", currentQuiz)
  }
  else {
    socket.on("send_message", (data: any) => {
      waitTime = 5
      questionDuration = 10
      numberOfquestion = data.numberOfquestion
      rankOfQuestion = data.rankOfQuestion
      console.log('le rank', rankOfQuestion)
      const wait = { waitTime: waitTime }
      const conct = Object.assign({}, data, wait)
      socket.broadcast.emit("receive_message", conct)
      currentQuiz = conct
      console.log("le data", data)

      let countdownIntervalWaitTime = setInterval(() => {
        if (waitTime > 0) {
          waitTime--;
          console.log("decrement", waitTime);
        } else {
          clearInterval(countdownIntervalWaitTime);
        }
      }, 1000);
      let countdownIntervalResponseTime = setInterval(() => {
        if (waitTime == 0 && questionDuration > 0) {
          questionDuration--
          console.log("decrement quiz duration", questionDuration)
        }
        else if (waitTime == 0 && questionDuration == 0) {
          clearInterval(countdownIntervalResponseTime)
        }
      }, 1000)

    }

    );
  }
  socket.on('disconnect', () => {
    console.log("utilisateur déconnecté")
  })
});

server.listen(7100, () => {
  console.log("server is running ");
});
