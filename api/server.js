const express = require('express');

const projectsRouter = require("./projects/projects-router")

const actionsRouter = require("./actions/actions-router")


const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter);

server.use('/api/actions', actionsRouter);


server.get('/', (req, res) => {
  res.send(`
    <h2>Tays Projects And Actions API</h>
  `);
});

module.exports = server;