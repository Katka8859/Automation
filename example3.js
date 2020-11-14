/* ZADANI:
  Doplň všechny testcasy
  přidej kroky 
  přidej assertion (expect)
*/

/*
HINT: Secret password je schovane v HTML (nedaleko inputu pro secret heslo)
  Je potreba ho najit a precist. Nevadi, ze neni zobrazene - data tam jsou.
  Cislo se generuje kazdym nactenim stranky, nestaci si jej jednou precist a 
    a pak ho pouzivat celou dobu. 
  Hlasky maji dva stavy - 1) heslo je spravne, 2) heslo je spatne.
  Good luck! 
*/
const saveScreenshot = (name) => {
  const getCorrectFormat = () => {
      let date = new Date();
      let year = date.getFullYear(); //vrati 2020
      let month = date.getMonth() + 1; // leden je 0, unor 1, atd., tak proto pridavame +1
      let day = date.getDay();
  
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let format = year + '-'+ month +'-' + day + '-' + hours + '-' + minutes + '-' + seconds + '-'
      return format 
  }
  browser.saveScreenshot('./' + getCorrectFormat() + name + '.png')
}

const help = require('../03_mocha/help')

describe('Secret number', () => {
  beforeEach(() => { //muzes zmenit na beforeEach, pokud je potreba
    browser.url('https://automation.cervik.repl.co/inputs.html')
  })

  it('confirmation appears after validating correct secret number', () => {
    // DOPLN
    let secretNumber = browser.$('#secretPassword').getValue()
    browser.$('#secretNumberInput').setValue(secretNumber)
    browser.$('#checkSecretNumber').click()
    let confirmation = browser.$('#passwordHelpBlock')
    expect(confirmation).toHaveText('Super secret je super správně.')
    help.saveScreenshot('superCorrectNumber')
  })


  it('error appears after validating wrong secret number', () => {
    // DOPLN
    browser.$('#secretNumberInput').setValue('123myJsmeBratri')
    browser.$('#checkSecretNumber').click()
    let confirmation = browser.$('#passwordHelpBlock')
    expect(confirmation).toHaveText('Super secret je super špatně.')
    saveScreenshot('superWrongNumber')
  })


  it('error appears after validating empty secret number', () => {
    // DOPLN
    browser.$('#checkSecretNumber').click()
    let confirmation = browser.$('#passwordHelpBlock')
    expect(confirmation).toHaveText('Super secret je super špatně.')
    saveScreenshot('superEmptyNumber')
  })
})