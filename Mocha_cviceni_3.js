/* ZADANI:
  Ověř, že tlačíko Přidej kočku přidá kartu s kočkou.
  Ověř, že tlačíko Přidej kočku dokáže přidat vícero karet s kočkou.
  Ověř, že tlačíko Odeber kočku odebere jednu kartu s kočkou.
  Ověř, že tlačíko Apokalypsa! smaže všechny karty s kočkou.
  Ověř, že počítadlo koček reaguje na přidání kočky, smazání kočky, smazání všech koček
  Ověř, že lze přidat 20 karet s kočkou.
  Zajisti, aby Tvé testy byly atomické = aby byly na sobě nezávislé, daly se spouštět jednotlivě.
  Ověř, že tlačítka na odebrání jsou aktivní jen, když je zobrazena aspoň jedna karta kočky
  Ověř, že tlačítka na odebrání jsou deaktivována po smazání poslední karty kočky.
*/

describe('na strance https://automation.cervik.repl.co/adding.html overuji zda funguje tlacitko pridej kocku, odeber kocku, apokalypsa', () => { 
  before(()=>{
    browser.url('https://automation.cervik.repl.co/adding.html')
  })

  it('tlacitko pridej kocku', ()=>{
    browser.$('#addItem').click()
    browser.pause(500)
    let pridej = browser.$('.card-img-top')
    

    expect(pridej).toHaveAttribute('src', 'https://automation.cervik.repl.co/images/cat.png')
  
  })

  it('pridej hodne kocek pomoci tlacitka pridej kocku',()=>{
    //browser.$('#addItem')
    for (let i = 0; i < 4; i = i + 1) {
      // element, ktery jsme nasli na radku 12 a ted na nej klikame
      browser.$('#addItem').click()
      browser.pause(500)
    }
      
      let obrazek = browser.$$('.card-img-top')
      expect(obrazek).toHaveAttribute('src', 'https://automation.cervik.repl.co/images/cat.png',5)

  })
  it('tlacitko odeber kocku',()=>{
    browser.$('#removeItem').click()
    browser.pause(500)
    let obrazek = browser.$$('.card-img-top')
    expect(obrazek).toHaveAttribute('src', 'https://automation.cervik.repl.co/images/cat.png',4)

  })

  it('tlacitko apokalypsa', ()=>{
    browser.$('#removeAll').click()
    let pocitadlo = browser.$('#counter')
    browser.pause(500)
    expect(pocitadlo).toHaveText('0')
  })

 

  describe('na strance https://automation.cervik.repl.co/adding.html overuji, jestli funguje pocitadlo kocek', ()=>{
    it('pocitadlo-pridej kocku', ()=>{
      browser.$('#addItem').click()
      let pocitadlo = browser.$('#counter')
      browser.pause(500)
      expect(pocitadlo).toHaveText('1')

    })
    it('pocitadlo-odeber kocku', ()=>{
      browser.$('#removeItem').click()
      let pocitadlo = browser.$('#counter')
      browser.pause(500)
      expect(pocitadlo).toHaveText('0')
    })

    it('pocitadlo reaguje na tlacitko apokalypsa', ()=>{
      browser.$('#removeAll').click()
      let pocitadlo = browser.$('#counter')
      browser.pause(500)
      expect(pocitadlo).toHaveText('0')
    })
  })

  describe('na strance https://automation.cervik.repl.co/adding.html overuji, jestli jde pridat 20 kocek', ()=>{
    it('pridani 20 kocek', ()=>{
      for (let i = 0; i < 20; i = i + 1) {
        // element, ktery jsme nasli na radku 12 a ted na nej klikame
        browser.$('#addItem').click()
        browser.pause(500)
      }
        
        let obrazek = browser.$$('.card-img-top')
        expect(obrazek).toHaveAttribute('src', 'https://automation.cervik.repl.co/images/cat.png',20)

    })
    
  })
  describe('na strance https://automation.cervik.repl.co/adding.html overuji aktivaci tlacitka odeber kocku', ()=>{
    it('tlacitko odeber kocku-neaktivni bez pridani kocky', ()=>{
      browser.$('#removeItem').click()
      if(browser.$('#removeItem.btn.btn-danger.removing.disabled')){
        console.log(true, 'tlacitko odeber kocku neni aktivni, protoze nemas pridanou zadnou kocku')
      } else{
        console.log(false)
      };
    })
    it('tlacitko odeber kocku-aktivni po pridani alespon jedne kocky', ()=>{

      browser.$('#addItem').click()
      if(browser.$('#removeItem.btn.btn-danger.removing')){
        console.log(true, 'tlacitko odeber kocku je aktivni')
      } else {
        console.log(false)
      }
    })
  })

  describe('na strance https://automation.cervik.repl.co/adding.html overuji aktivaci tlacitka apokalypsa', ()=>{
    it('tlacitko apokalypsa-neaktivni bez pridani kocky', ()=>{
      browser.$('#removeAll').click()
      if(browser.$('#removeAll.btn.btn-danger.removing.disabled')){
        console.log(true, 'tlacitko apokalypsa neni aktivni, protoze nemas pridanou zadnou kocku')
      } else{
        console.log(false)
      };
    })


    it('tlacitko apokalypsa-aktivni po pridani kocky', ()=>{
      browser.$('#addItem').click()
      if(browser.$('#removeAll.btn.btn-danger.removing')){
        console.log(true, 'tlacitko apokalypsa je aktivni')
      } else {
        console.log(false)
      }


    })
  });
  describe('na strance https://automation.cervik.repl.co/adding.html overuji deaktivaci tlacitek odeber kocku a apokalypsa', ()=>{
    it('deaktivace tlacitka odeber kocku', ()=>{
      browser.$('#addItem').click()
      browser.$('#removeItem').click()
      browser.$('#removeItem').click()
      if(browser.$('#removeItem.btn.btn-danger.removing.disabled')){
        console.log(true, 'tlacitko odeber kocku deaktivovano')
      }else if(browser.$('#removeItem.btn.btn-danger.removing')){
        console.log(false, 'tlacitko obedeber kocku je funkcni')
      }else{
        console.log(false)
      }  

    })

    it('deaktivace tlacitka apokalypsa', ()=>{
      browser.$('#addItem').click()
      browser.$('#removeAll').click()
      browser.$('#removeAll').click()
      if(browser.$('#removeAll.btn.btn-danger.removing.disabled')){
        console.log(true, 'tlacitko apokalypsa deaktivovano')
      }else if(browser.$('#removeAll.btn.btn-danger.removing')){
        console.log(false, 'tlacitko apokalypsa stale funkci')
      }else{
        console.log(false)
      }  
    })
  })
    
})
