// @flow
import express from 'express';
import bodyParser from 'body-parser';
import * as userCases from '../usecases/users/index.js';
import * as errors from './errors/index.js';

const userErrors = errors.getErrors('user');

const startServer = function() {
  const PORT = 5000;
  const app = express();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.get('/', (req, res) => {
    res.status(200).json('Это стартовая страница нашего приложения!');
  });

  app.get('/users', (req, res) => {
    const userList = userCases.getUsers();

    userList
      .then(data => res.status(200).json(data))
      .catch(err => {
        console.error(err);
        res.status(400).send(userErrors.get);
      });
  });

  app.post('/users', (req, res) => {
    const { firstName, lastName, email } = req.body;

    userCases
      .createUser(firstName, lastName, email)
      .then(id => {
        res.status(201).send(`User added with ID: ${id}`);
      })
      .catch(err => {
        console.error(err);
        res.status(400).send(userErrors.create);
      });
  });

  app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email } = req.body;

    userCases
      .updateUser(id, firstName, lastName, email)
      .then(id => {
        res.status(201).send(`User updated with ID: ${id}`);
      })
      .catch(err => {
        console.error(err);
        res.status(400).send(userErrors.update);
      });
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    userCases
      .deleteUser(id)
      .then(() => {
        res.status(201).send(`User deleted`);
      })
      .catch(err => {
        console.error(err);
        res.status(400).send(userErrors.delete);
      });
  });

  app.listen(PORT, () => {
    console.log('Server is working!');
  });
};

export { startServer };
