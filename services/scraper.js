const pup = require('puppeteer');

const getMilhasDetails = async () => {
  try {

    let _htmlInfo = [];

    const browser = await pup.launch({
      headless: true,
    });

    const page = await browser.newPage();
    console.log('Browser init');

    await page.goto('https://www.e-milhas.com/cotacao');

    await page.waitForSelector("#tabela-cotacao");

    const tableMilhas = await page.$$eval('#tabela-cotacao > tbody', el => el.map((content) => content.innerText))
    _htmlInfo.push({
      allHTMLInfos: tableMilhas
    })

    const dateAtUpdate = await page.$$eval('body > div:nth-child(15) > div > div > div.col-md-8.col-sm-12 > div:nth-child(1) > div > div.col > p.mb-0.mt-4', el => el.map((content) => content.textContent))

    _htmlInfo.push({
      label: 'Updated',
      value: dateAtUpdate
    });

    const tableValues = await page.$$eval('#tabela-cotacao > tbody > tr > td:nth-child(2)', el => el.filter((content) => {
      if (content.innerText.includes('R$')) {
        return content.innerText;
      }
    }))

    // Return qtd miles
    const qtdValues1 = await page.$$eval('#tabela-cotacao > tbody > tr:nth-child(1) > td', el => el.map((content) => {
      if (content.innerText) {
        return content.innerText;
      }
    }));
    const qtdValues2 = await page.$$eval('#tabela-cotacao > tbody > tr:nth-child(7) > td', el => el.map((content) => {
      if (content.innerText) {
        return content.innerText;
      }
    }))
    const qtdValues3 = await page.$$eval('#tabela-cotacao > tbody > tr:nth-child(14) > td', el => el.map((content) => {
      if (content.innerText) {
        return content.innerText;
      }
    }))
    const qtdValues4 = await page.$$eval('#tabela-cotacao > tbody > tr:nth-child(20) > td', el => el.map((content) => {
      if (content.innerText) {
        return content.innerText;
      }
    }))
    const qtdValues5 = await page.$$eval('#tabela-cotacao > tbody > tr:nth-child(27) > td', el => el.map((content) => {
      if (content.innerText) {
        return content.innerText;
      }
    }))
    const qtdValues6 = await page.$$eval('#tabela-cotacao > tbody > tr:nth-child(33) > td', el => el.map((content) => {
      if (content.innerText) {
        return content.innerText;
      }
    }))
    const qtdValues7 = await page.$$eval('#tabela-cotacao > tbody > tr:nth-child(39) > td', el => el.map((content) => {
      if (content.innerText) {
        return content.innerText;
      }
    }))

    _htmlInfo.push(
      {
        label: 'Milha values',
        value: tableValues
      },
      {
        label: 'Quantidade de milhas',
        smiles: {
          label: 'Smiles',
          value1: qtdValues1,
          value2: qtdValues2
        },
        latamPass: {
          label: 'Latam Pass',
          value1: qtdValues3,
          value2: qtdValues4
        },
        tudoAzul: {
          label: 'Tudo Azul',
          value1: qtdValues5,
          value2: qtdValues6,
          value3: qtdValues7
        }
      }
    );


    console.log(_htmlInfo);
    return {
      _htmlInfo
    }
  } catch (err) {
    return `OOPS: ${err}`;
  };
};
module.exports = getMilhasDetails;