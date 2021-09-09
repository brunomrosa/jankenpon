import express from "express";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
const port = 3333;

app.use(cors());
app.options("*", cors());

const gamerooms = [];
const users = [];
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("gameroom", (gameroom) => {
    gamerooms.push(gameroom);
    console.log(gamerooms);
  });

  socket.on("check-user", (user) => {
    const userExists = users.some((element) => element.name === user.name);
    if (!userExists) {
      users.push(user);
    }
    console.log(users);
  });
});
