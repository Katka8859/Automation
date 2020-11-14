describe('03 Elements', () => {
    it('should pass correctly', () => {
        // jdi na adresu
        browser.url('https://automation.cervik.repl.co/selectors.html');


        let headerOfStory = browser.$('section#pohadka h2')    // najdi nadpis pohadky O Budulinkovi
        let paragraphsOfStory = browser.$$('section#pohadka p')  // najdi vsechny paragraphs pohadky O Budulinkovi
        let foxsInStory = browser.$("p*=lištičky")         // najdi paragraph, kde se vyskytuje slovo "lištičky"
        let imageOfStory = browser.$('.story-image')        // najdi ilustraci v pohadce o budulinkovi
        let giveLikeButton = browser.$('#like-button')      // najdi tlacitko "Dej like!" na konci pohadky
        let likeCounter = browser.$('#lvlAwesome')         // najdi pocitadlo pod pohadkou*/

        expect(headerOfStory).toHaveText('O Budulínkovi')       // overi se, ze element v promenne headerOfStory ma dany text
        expect(paragraphsOfStory).toBeElementsArrayOfSize(16)   // overi, ze pocet elementu v poli se rovna 16
        expect(foxsInStory).toHaveTextContaining('lištičky')    // overi, ze v danem elementu jsou opravdu lištičky
        // overi, ze dany element ma cestu k obrazku, takze to je ten spravny image
        expect(imageOfStory).toHaveAttribute('src', 'https://automation.cervik.repl.co/images/budulinek.jpg')


        likeCounter.scrollIntoView()
        for(let i= 0; i < 10; i = i +1) {
            // element, ktery jsme nasli na radku 12 a ted na nej klikame
            giveLikeButton.click()
            browser.pause(500)
        }

        expect(likeCounter).toHaveText('10') 
    });
});
