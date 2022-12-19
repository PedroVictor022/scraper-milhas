const express = require('express');
const router = require('./route');
const getMilhasDetails = require('./services/scraper');


const app = express();
const port = process.env.port || 8080;

app.use(router);
getMilhasDetails()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`);
});