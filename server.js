const express = require('express');
const router = require('./route');

const app = express();
const port = process.env.port || 8080;

app.use(router)

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`);
});