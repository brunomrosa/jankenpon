import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import {
  addUser,
  getUser,
  getUsers,
  deleteUser,
  selectOption,
  GetUserByRoom,
  verifyIfOponentHasChosen,
} from "./users";
const app = express();
const port = 3333;

app.use(cors());
app.options("*", cors());

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
  console.log("User connected");
  socket.on("login", ({ username, gameroom }, callback) => {
    const { user, error } = addUser(socket.id, username, gameroom);
    if (error) return callback({ error: error });
    socket.join(user?.gameroom);

    return callback({ room: gameroom });
  });

  socket.on("roomInfo", (room, callback) => {
    const users = getUsers(room);

    return callback(users);
  });

  socket.on("sendMessage", ({ username, message, room }) => {
    const user = GetUserByRoom(username, room);
    io.in(user?.room).emit("message", { user: user?.name, text: message });
  });

  socket.on("selectOption", (user, room, option) => {
    const choice = selectOption(user, room, option);
    io.in(user.room).emit("message", true);
  });

  socket.on("verifyIfOponentHasChosen", ({ username, room }, callback) => {
    const verify = verifyIfOponentHasChosen(username, room);

    return callback(verify);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit("notification", {
        title: "Someone just left",
        description: `${user.name} just left the room`,
      });
      io.in(user.room).emit("users", getUsers(user.room));
    }
  });
});
