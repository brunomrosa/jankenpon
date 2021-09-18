const users = [];

export const addUser = (id, username, room) => {
  const existingUser = users.find(
    (user) =>
      user.username.trim().toLowerCase() === username.trim().toLowerCase()
  );

  if (existingUser?.username === username && existingUser?.room === room)
    return { error: "Username has already been taken" };
  if (!username && !room) return { error: "Username and room are required" };
  if (!username) return { error: "Username is required" };
  if (!room) return { error: "Room is required" };

  const user = { id, username, room };
  users.push(user);

  return { user };
};

export const getUser = (id) => {
  let user = users.find((user) => user.id == id);
  return user;
};

export const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUsers = (room) => {
  const retorno = users.filter((user) => user?.room === room);
  return retorno;
};

export const GetUserByRoom = (username, room) => {
  const findUser = users.filter(
    (user) => user.username === username && user.room === room
  );

  return findUser;
};

export const selectOption = ({ username, room, option }) => {
  const findUser = GetUserByRoom(username, room);
  if (findUser && !findUser.option) {
    const index = users.findIndex(
      (user) => user.username === username && user.room === room
    );

    const saveSelection = { username, room, option };
    if (index !== -1) return users.splice(index, 1, saveSelection);
  }

  return findUser;
};

export const verifyIfOponentHasChosen = (username, room) => {
  const findOponent = users.filter(
    (user) => user?.username !== username && user?.room === room
  );

  return findOponent;
};
