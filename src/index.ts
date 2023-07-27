import express = require("express");
import cors = require("cors");
import { PORT } from "./config/constants";

// routes
import teamsRoutes from "./routes/teams";
import groupsRoutes from "./routes/groups";
import extraRoutes from "./routes/extra";
import matchsRoutes from "./routes/matchs";
import playersRoutes from "./routes/players";
import authRoutes from "./routes/auth";
import stadiumsRoutes from "./routes/stadiums";
import userRoutes from "./routes/user";
import ticketRoutes from "./routes/ticket"
import quizRoutes from "./routes/quiz"
//
import http from 'http'
import {Server} from "socket.io"



const app = express();
//
const server = http.createServer(app)



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/teams", teamsRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/extra", extraRoutes);
app.use("/api/matchs", matchsRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stadiums", stadiumsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/quiz", quizRoutes);

app.listen(parseInt(PORT as string), () =>
  console.log(`Running on http://localhost:${PORT}`)
);


//
const io = new Server(server, {
  cors:{
    origin:'http://localhost:5173',
    methods: ['GET', 'POST'],   
  }
})

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on("send_message", (data: any) => {
    console.log(data)
    socket.broadcast.emit("receive_message", data)
  })
  
});

server.listen(3500, () => {
  console.log('server is running ')
})
