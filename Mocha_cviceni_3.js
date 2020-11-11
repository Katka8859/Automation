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
  beforeEach(()=>{
    browser.url('https://automation.cervik.repl.co/adding.html')
  })

  it('tlacitko pridej kocku', ()=>{
    browser.$('#addItem').click()
    browser.pause(500)
    let pridej = browser.$('//*[@src="images/cat.png"]')
    expect(pridej).toBeVisible('src', 'https://automation.cervik.repl.co/images/cat.png')
   
  })

  
  it('pridej hodne kocek pomoci tlacitka pridej kocku',()=>{
    
    for (let i = 0; i < 5; i = i + 1) {
      
      browser.$('#addItem').click()
      browser.pause(500)
    }
      let obrazek = browser.$$('//*[@src="images/cat.png"]')
      expect(obrazek).toBeElementsArrayOfSize(5)
  })
  
  it('tlacitko odeber kocku',()=>{
    for (let i = 0; i < 5; i = i + 1) {
      
      browser.$('#addItem').click()
      browser.pause(500)
    }
    let obrazek = browser.$$('//*[@src="images/cat.png"]')
    expect(obrazek).toBeElementsArrayOfSize(5)
    browser.$('#removeItem').click()
    browser.pause(500)
    let obrazek2 = browser.$$('//*[@src="images/cat.png"]')
    expect(obrazek2).toBeElementsArrayOfSize(5-1)
    
  })

  it('tlacitko apokalypsa', ()=>{
    for (let i = 0; i < 5; i = i + 1) {
      
      browser.$('#addItem').click()
      browser.pause(500)
    }
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
    
    it('pocitadlo reaguje na odeber kocku', ()=>{
      browser.$('#addItem').click()
      browser.$('#removeItem').click()
      let pocitadlo = browser.$('#counter')
      browser.pause(500)
      expect(pocitadlo).toHaveText('0')
    })

    it('pocitadlo reaguje na tlacitko apokalypsa', ()=>{
      for (let i = 0; i < 5; i = i + 1) {
      
        browser.$('#addItem').click()
        browser.pause(500)
      }
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
        
        let obrazek = browser.$$('//*[@src="images/cat.png"]')
        expect(obrazek).toBeElementsArrayOfSize(20)

    })
    
  })
  
  describe('na strance https://automation.cervik.repl.co/adding.html overuji, ze tlačítko odeber kocku a apokalypsa jsou aktivní jen, když je zobrazena aspoň jedna karta kočky', ()=>{
    it('tlacitko odeber kocku je aktivni až po pridani alespon jedne kocky', ()=>{

      browser.$('#addItem').click()
      let aktivaceOdeber = browser.$('#removeItem')
      expect(aktivaceOdeber).toHaveElementClass('removing')
      
    })

    it('tlacitko apokalypsa je aktivni az po pridani alepson jedne kocky', ()=>{
      browser.$('#addItem').click()
      let aktivaceApokalypsa = browser.$('#removeAll')
      expect(aktivaceApokalypsa).toHaveElementClass('removing')

  
    })

  });
  
  describe('na strance https://automation.cervik.repl.co/adding.html overuji, ze tlačítka na odebrání jsou deaktivována po smazání poslední karty kočky', ()=>{
    it('deaktivace tlacitka odeber kocku', ()=>{
      browser.$('#addItem').click()
      browser.$('#removeItem').click()
      let deaktivaceOdeber = browser.$('#removeItem')
      expect(deaktivaceOdeber).toHaveElementClass('disabled')

    })
      

    it('deaktivace tlacitka apokalypsa', ()=>{
      browser.$('#addItem').click()
      browser.$('#removeAll').click()
      let deaktivaceOdeber = browser.$('#removeAll')
      expect(deaktivaceOdeber).toHaveElementClass('disabled')
    })
  })
    
})
