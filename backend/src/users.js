const users = [];

export const getAllUsers = () => {
  return users;
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

  const user = { id, username, room };
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

  return findOponent;
};

export const GetUserByRoom = (username, room) => {
  const findUser = users.filter(
    (user) => user.username === username && user.room === room
  );

  return findUser;
};

export const selectOption = async ({ username, room, option }) => {
  const findUser = GetUserByRoom(username, room);

  if (findUser && !findUser.option) {
    const index = users.findIndex(
      (user) => user.username === username && user.room === room
    );

    const user = users[index];

    const saveSelection = { id: user?.id, username, room, option };
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
