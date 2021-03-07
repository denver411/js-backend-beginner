// @flow
import pg from 'pg';
import * as status from '../../statuses/index.js';

const client = new pg.Pool({
  user: 'zhebov',
  host: 'localhost',
  database: 'library_db',
  password: '123',
  port: 5432,
});

type User = {|
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  status: status.Status,
  createdAt: string,
  updatedAt: string,
|};

const makeUser = ({
  id,
  firstname,
  lastname,
  email,
  status,
  createdat,
  updatedat,
}) => ({
  id,
  firstName: firstname,
  lastName: lastname,
  email,
  status,
  createdAt: createdat,
  updatedAt: updatedat,
});

const getUsers = (): Promise<Array<User>> => {
  const query = {
    text: `SELECT * FROM users WHERE status = $1`,
    values: [status.active],
  };

  return client.query(query).then(res => res.rows.map(makeUser));
};

const createUser = (
  firstName: string,
  lastName: string,
  email: string
): Promise<number> => {
  const query = {
    text: `
	INSERT INTO users(
		firstName,
		lastName,
		email,
		status
	) VALUES ($1, $2, $3, $4)
        RETURNING id`,
    values: [firstName, lastName, email, status.active],
  };

  return client.query(query).then(res => res.rows.map(makeUser)[0].id);
};

const updateUser = (
  userId: number,
  firstName: string,
  lastName: string,
  email: string
): Promise<number> => {
  const query = {
    text: `
	UPDATE users
	SET
	  firstName = $2,
	  lastName = $3,
	  email = $4,
	  updatedAt =$5
        WHERE id = $1
        RETURNING id`,
    values: [userId, firstName, lastName, email, new Date().toISOString()],
  };

  return client.query(query).then(res => res.rows.map(makeUser)[0].id);
};

const deleteUser = (userId: number): Promise<void> => {
  const query = {
    text: `
        UPDATE users
        SET status = $2,
        updatedAt= $3
	WHERE id = $1`,
    values: [userId, status.deleted, new Date().toISOString()],
  };

  return client.query(query).then();
};

export { getUsers, createUser, updateUser, deleteUser };
