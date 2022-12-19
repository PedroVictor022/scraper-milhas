const getMilhasDetails = require('./scraper');

console.log('oi');

getMilhasDetails()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(`err - ${err}`);
  });