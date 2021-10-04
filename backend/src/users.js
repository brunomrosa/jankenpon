const users = [];

export const getAllUsers = () => {
  return users;
};

export const findWinner = ({ room }) => {
  const p1 = users[0];
  const p2 = users[1];

  if (p1.option === p2.option) {
    return "fair";
  }

  const rock = {
    scissor: "win",
    paper: "loss",
  };
  const paper = {
    rock: "win",
    scissor: "loss",
  };
  const scissor = {
    paper: "win",
    rock: "loss",
  };

  if (p1.option === "rock") {
    const result = rock[p2.option];

    if (result === "win") {
      p1.score += 1;
      p1.option = "";

      p2.option = "";

      updateUser(p1.id, p1);
      updateUser(p2.id, p2);
      return { winner: p1 };
    } else {
      p2.score += 1;
      p2.option = "";

      p1.option = "";

      updateUser(p1.id, p1);
      updateUser(p2.id, p2);
      return { winner: p2 };
    }
  }
  if (p1.option === "paper") {
    const result = paper[p2.option];

    if (result === "win") {
      p1.score += 1;
      p1.option = "";

      p2.option = "";

      updateUser(p1.id, p1);
      updateUser(p2.id, p2);

      return { winner: p1 };
    } else {
      p2.score += 1;
      p2.option = "";

      p1.option = "";

      updateUser(p1.id, p1);
      updateUser(p2.id, p2);

      return { winner: p2 };
    }
  }
  if (p1.option === "scissor") {
    const result = scissor[p2.option];

    if (result === "win") {
      p1.score += 1;
      p1.option = "";

      p2.option = "";

      updateUser(p1.id, p1);
      updateUser(p2.id, p2);
      return { winner: p1 };
    } else {
      p2.score += 1;
      p2.option = "";

      p1.option = "";

      updateUser(p1.id, p1);
      updateUser(p2.id, p2);

      return { winner: p2 };
    }
  }
  return null;
};

export const updateUser = async (id, body) => {
  const index = users.findIndex((user) => user.id === id);

  const saveSelection = body;
  await users.splice(index, 1, saveSelection);

  return true;
};

export const verifyIfUsersHaveSelected = ({ room }) => {
  const players = users.filter((user) => user.room === room);
  if (players.length <= 1) return false;
  return players.every((user) => !!user.option);
};

export const addUser = (id, username, room) => {
  const existingUser = users.find(
    (user) =>
      user.username.trim().toLowerCase() === username.trim().toLowerCase()
  );

  if (existingUser?.username === username && existingUser?.room === room)
    return { error: "Username has already been taken" };
  if (!username && !room) return { error: "Username and room are required" };
  if (!username) return { error: "Username is required" };
  if (!!!username) {
    error: "Username is required";
  }
  if (!room) return { error: "Room is required" };

  const user = { id, username, room, score: 0 };
  users.push(user);

  return { user };
};

export const getUser = (id) => {
  let user = users.find((user) => user.id == id);
  return user;
};

export const deleteUser = async (id) => {
  const index = users.findIndex((user) => user.id == id);
  let user = await getUser(id);
  if (user) {
    await users.splice(index, 1)[0];
    if (index !== -1) return user;
  }
};

export const getUsers = (room) => {
  const retorno = users.filter((user) => user?.room === room);
  return retorno;
};

export const getOponent = (username, room) => {
  const findOponent = users.filter(
    (user) => user?.username !== username && user?.room === room
  );

  return findOponent[0];
};

export const getUsersInRoom = (room) => {
  const findUsers = users.filter((user) => user?.room === room);

  return findUsers;
};

export const GetUserByRoom = (username, room) => {
  const findUser = users.filter(
    (user) => user.username === username && user.room === room
  );

  return findUser;
};

export const selectOption = async ({ username, room, option, score }) => {
  const findUser = GetUserByRoom(username, room);

  if (findUser && !findUser.option) {
    const index = users.findIndex(
      (user) => user.username === username && user.room === room
    );

    const user = users[index];

    const saveSelection = {
      id: user?.id,
      username,
      room,
      option,
      score: score,
    };
    await users.splice(index, 1, saveSelection);

    if (index !== -1) return users[index];
  }

  return findUser;
};

export const verifyIfOponentHasChosen = (username, room) => {
  const findOponent = users.filter(
    (user) => user?.username !== username && user?.room === room
  );

  return findOponent;
};
