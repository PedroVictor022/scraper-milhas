const getMilhasDetails = require('./services/scraper');

const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    getMilhasDetails()
    .then((data) => {
      res.status(200).send(data);
    })
  } catch(err) {
    res.status(404).send(`Error - ${err}`);
  }
})

module.exports = router;