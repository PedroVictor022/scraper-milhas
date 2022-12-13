const e = require('express');
const pup = require('puppeteer');

const getMilhasDetails = async () => {
  try {

    let _htmlInfo = [];
    let _htmlValue = [];
    let row = {};

    const browser = await pup.launch({
      headless: true,
    });

    const page = await browser.newPage();
    console.log('Browser init');

    await page.goto('https://www.e-milhas.com/cotacao');

    await page.waitForSelector("#tabela-cotacao");

    const tableMilhas = await page.$$eval('#tabela-cotacao > tbody', el => el.map((content) => content.innerText))
    _htmlInfo.push(tableMilhas)

    const dateAtUpdate = await page.$$eval('body > div:nth-child(15) > div > div > div.col-md-8.col-sm-12 > div:nth-child(1) > div > div.col > p.mb-0.mt-4', el => el.map((content) => content.textContent));

    _htmlValue.push({
      label: 'Updated',
      value: dateAtUpdate
    });

    /**
     * TODO 
     * 1 - Fazer verificacao se a string retornada tem R$
     * 2 - Se tiver adiciona no array
     * 3 - Pensar em logica pra filtrar
     */

    const tableValues = await page.$$eval('#tabela-cotacao > tbody > tr > td:nth-child(2)', el => el.map((content) => {
      if(content.innerText.includes('R$')) {
        return content.innerText;
      }
    }))
    _htmlValue.push({
      label: 'Milha values',
      value: tableValues
    })



    return {
      _htmlValue
    }
  } catch (err) {
    return `OOPS: ${err}`;
  };
};

module.exports = getMilhasDetails;