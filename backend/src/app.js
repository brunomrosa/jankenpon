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
  getAllUsers,
  getOponent,
  getUsersInRoom,
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
  socket.on("error", function (err) {
    console.log("err : ");
    console.log(err);
  });

  socket.on("login", ({ username, gameroom }, callback) => {
    const { user, error } = addUser(socket.id, username, gameroom);
    if (error) return callback({ error: error });
    socket.join(user.room);
    console.log(
      `User connected, User: ${user.username}, room: ${gameroom}, id: ${socket.id}`
    );
    const users = getUsersInRoom(gameroom);

    io.sockets.to(gameroom).emit("playerJoined", users);

    return callback(user);
  });

  socket.on("roomInfo", (username, room, callback) => {
    if (!!!username) {
      return callback({ error: "Username is required" });
    }
    const oponent = getOponent(username, room);

    return callback(oponent);
  });

  socket.on("sendMessage", ({ username, message, room }) => {
    const user = GetUserByRoom(username, room);
    console.log("username ", username);
    console.log("room ", room);
    console.log("message ", message);

    io.sockets.to(room).emit("message", message);
  });

  socket.on("selectOption", async (user, callback) => {
    const choice = await selectOption(user);
    io.sockets
      .to(user?.room)
      .emit("message", { user: user?.name, text: user?.option });
    /*    console.log(user.room); */
    return callback(choice);
  });

  socket.on("verifyIfOponentHasChosen", ({ username, room }, callback) => {
    const verify = verifyIfOponentHasChosen(username, room);

    return callback(verify);
  });

  socket.on("disconnect", async () => {
    const user = await deleteUser(socket.id);
    if (user?.room) {
      console.log("user?.room");
      io.sockets.to(user?.room).emit("message", { msg: "disconnected" });
      io.sockets
        .to(user?.room)
        .emit("disconnected", { disconnected: "disconnected" });
    }

    /*  io.emit("teste", "desconectou geral"); */

    /* io.in(user.room).emit("notification", {
        title: "Someone just  left",
        description: `${user.name} just left the room`,
      }); */
  });
});
