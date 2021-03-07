// @flow

import * as userStorage from '../../storage/users/index.js';

type User = {|
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
|};

const makeUser = ({ id, firstName, lastName, email }) => ({
  userId: id,
  firstName,
  lastName,
  email,
});

const getUsers = (): Promise<Array<User>> => {
  return userStorage.getUsers().then(res => res.map(makeUser));
};

const createUser = (
  firstName: string,
  lastName: string,
  email: string
): Promise<number> => userStorage.createUser(firstName, lastName, email);

const updateUser = (
  userId: number,
  firstName: string,
  lastName: string,
  email: string
): Promise<number> =>
  userStorage.updateUser(userId, firstName, lastName, email);

const deleteUser = (userId: number): Promise<void> =>
  userStorage.deleteUser(userId);

export { getUsers, createUser, updateUser, deleteUser };
