const express = require('express');
const server = express();
const postsRouter = require('./posts/postRouter.js')

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Ethans Post API</h>
    <p>Welcome to the my Post API</p>
  `);
});

module.exports = server;