const express = require('express');

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());

const repositories = [];

app.get('/repositories', (_request, response) => {
  return response.send(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.status(201).send(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const body = request.body;

  delete body.likes;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).send({ error: 'Repository not found' });
  }

  repositories[repositoryIndex] = { ...repositories[repositoryIndex], ...body };

  return response.send(repositories[repositoryIndex]);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).send({ error: 'Repository not found' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).send({ error: 'Repository not found' });
  }

  ++repositories[repositoryIndex].likes;

  return response.send(repositories[repositoryIndex]);
});

module.exports = app;
