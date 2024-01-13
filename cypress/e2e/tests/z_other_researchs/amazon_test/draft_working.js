import AMZ_LoginPageUI from '../../../pageUIs/amazon_ui/AMZ_LoginPageUI';
import AMZ_HomePageUI from '../../../pageUIs/amazon_ui/AMZ_HomePageUI';

const loginPageUI = new AMZ_LoginPageUI();
const homePageUI = new AMZ_HomePageUI();

describe('Test Suite 1', function () {
    beforeEach(function () {
        //Read data from fixture file
        cy.fixture('data').then(function (data) {
            this.data = data;
            //Visit Amazon Home Page
            cy.visit(data.url);
        })

    })

    it('TC1: Verify functionality of login with invalid account (email or password)', function () {
        //Verify Page title is "Amazon.com. Spend less. Smile more."
        homePageUI.pageTitle.should('eq', 'Amazon.com. Spend less. Smile more.')

        //Click on Sign In button
        homePageUI.signInButton.click();

        //Navigate to Sign In page
        //Verify Page title is "Amazon Sign In"
        loginPageUI.pageTitle.should('eq', 'Amazon Sign-In')
        //Verify Texts on Email Input page
        loginPageUI.text1.should('contains.text', 'Email or mobile phone number');
        loginPageUI.text2.should('contains.text', 'New to Amazon?');
        loginPageUI.text3.should('contains.text', 'Create your Amazon account');
        //Verify Elements on Email Input page
        //Email text box is visible
        loginPageUI.emailInput.should('be.visible');
        //Continue button is visible
        loginPageUI.continueButton.should('be.visible');

        //Input blank email
        loginPageUI.emailInput.clear();
        loginPageUI.continueButton.click();
        //Verify error message "Enter your email or mobile phone number" is displayed
        loginPageUI.emailAlertBottomContent.should('contains.text', 'Enter your email or mobile phone number');

        //Input wrong email format
        loginPageUI.emailInput.clear().type('gttest@');
        loginPageUI.continueButton.click();
        //Verify error message "There was a problem" and "We cannot find an account with that email address" are displayed
        loginPageUI.emailAlertHeading.should('contains.text', 'There was a problem');
        loginPageUI.emailAlertHeadingContent.should('contains.text', 'We cannot find an account with that email address');

        //Input wrong phone number format
        loginPageUI.emailInput.clear().type('012');
        loginPageUI.continueButton.click();
        //Verify error message "Incorrect phone number" and "We cannot find an account with that mobile number" are displayed
        loginPageUI.emailAlertHeading.should('contains.text', 'Incorrect phone number');
        loginPageUI.emailAlertHeadingContent.should('contains.text', 'We cannot find an account with that mobile number');

        //Input valid email to go to Password Input page
        loginPageUI.emailInput.clear().type('gt.test.login@gmail.com');
        loginPageUI.continueButton.click();
        //Verify Page title is still "Amazon Sign In"
        loginPageUI.pageTitle.should('eq', 'Amazon Sign-In')

        //Verify Texts on Password Input page
        loginPageUI.emailDisplayed.should('contains.text', 'gt.test.login@gmail.com');
        loginPageUI.changeAccount.should('contains.text', 'Change');
        loginPageUI.passwordLabel.should('contains.text', 'Password');
        loginPageUI.forgotPassword.should('contains.text', 'Forgot your password?');
        loginPageUI.rememberLogin.should('contains.text', 'Keep me signed in.');

        //Verify Elements on Password Input page
        loginPageUI.passwordInput.should('be.visible');
        loginPageUI.submitSignin.should('be.visible');

        //Input blank password
        loginPageUI.passwordInput.clear();
        loginPageUI.submitSignin.click();
        //Verify error message "Enter your password" is displayed
        loginPageUI.passwordAlertBottomContent.should('contains.text', 'Enter your password');

        //Input wrong password
        loginPageUI.passwordInput.clear().type('123');
        loginPageUI.submitSignin.click();
        //Verify error message "There was a problem" and "Your password is incorrect" are displayed
        loginPageUI.passwordAlertHeading.should('contains.text', 'There was a problem');
        loginPageUI.passwordAlertHeadingContent.should('contains.text', 'Your password is incorrect');

    });

    it('TC2: Verify user can login to amazon with a valid account', function () {
        //Verify Page title is "Amazon.com. Spend less. Smile more."
        loginPageUI.pageTitle.should('eq', 'Amazon.com. Spend less. Smile more.')

        //Click on Sign In button
        loginPageUI.signInButton.click();

        //Navigate to Sign In page
        //Verify Page title is "Amazon Sign In"
        loginPageUI.pageTitle.should('eq', 'Amazon Sign-In')
        //Verify Texts on Email Input page
        loginPageUI.text1.should('contains.text', 'Email or mobile phone number');
        loginPageUI.text2.should('contains.text', 'New to Amazon?');
        loginPageUI.text3.should('contains.text', 'Create your Amazon account');
        //Verify Elements on Email Input page
        //Email text box is visible
        loginPageUI.emailInput.should('be.visible');
        //Continue button is visible
        loginPageUI.continueButton.should('be.visible');

        //Input valid email to go to Password Input page
        loginPageUI.emailInput.clear().type('gt.test.login@gmail.com');
        loginPageUI.continueButton.click();
        //Verify Page title is still "Amazon Sign In"
        loginPageUI.pageTitle.should('eq', 'Amazon Sign-In')

        //Verify Texts on Password Input page
        loginPageUI.emailDisplayed.should('contains.text', 'gt.test.login@gmail.com');
        loginPageUI.changeAccount.should('contains.text', 'Change');
        loginPageUI.passwordLabel.should('contains.text', 'Password');
        loginPageUI.forgotPassword.should('contains.text', 'Forgot your password?');
        loginPageUI.rememberLogin.should('contains.text', 'Keep me signed in.');

        //Verify Elements on Password Input page
        loginPageUI.passwordInput.should('be.visible');
        loginPageUI.submitSignin.should('be.visible');

        //Input valid password to submit signin and go to Home Page
        loginPageUI.passwordInput.clear().type('Aa1234');
        loginPageUI.submitSignin.click();
        
        //If system detect anonymous and show "Keep hackers out" page, click on Skip button to go to Home Page
        cy.elementExists('#auth-account-fixup-phone-form > .a-section > .a-spacing-small', 'Keep hackers out')

        //Verify Elements on Home page appears after logging in successfully
        homePageUI.accountMenu.trigger('mouseover');
        homePageUI.accountMenu.should('contains.text', 'Hello, gt');
        homePageUI.manageProfile.should('contains.text', 'Manage Profiles');

    });

    it('TC3: Verify result list is paginated if there are more than 16 items', () => {
        homePageUI.departmentList.select('Books', { force: true })
        // Perform a search for "chẳng thể hiểu"
        homePageUI.searchBox.clear().type('apple');
        homePageUI.submitSearch.click();

        homePageUI.englishLanguage.click({ force: true });
        //Verify Page title is "Amazon.com : apple"
        homePageUI.pageTitle.should('include', 'Amazon.com : apple')

        // After performing the search, check the number of items
        cy.get('body').then($body => {
            //If the number of items is 16, pagination is applicable
            if ($body.find(`div[data-cy*='title-recipe']`).length >= 16) {
                // Verify pagination bar exists
                homePageUI.paginationBar.should('exist');
                homePageUI.paginationPrevious.should('be.visible');
                homePageUI.paginationNext.should('be.visible');
                cy.log('Greater than or equal to 16 items, pagination is applicable');

                //Verify the Result displays exactly 16 items on each page.
                cy.get(`div[data-cy*='title-recipe']`).should('have.length', 16);
            }
            //Else if the number of items below 16, pagination is applicable
            else {
                // Verify pagination bar does not exist
                homePageUI.paginationBar.should('not.exist');
                cy.log('Less than 16 items, pagination not applicable');
            }
        })
    });

    it.only('Verify result list can be sorted on demand', () => {
        homePageUI.departmentList.select('Books', { force: true })
        // Perform a search for "chẳng thể hiểu"
        homePageUI.searchBox.clear().type('apple');
        homePageUI.submitSearch.click();

        homePageUI.englishLanguage.click({ force: true });
        //Verify Page title is "Amazon.com : apple"
        homePageUI.pageTitle.should('include', 'Amazon.com : apple')

        // After performing the search, check the number of items
        cy.get('body').then($body => {
            //If the number of items is 16, pagination is applicable
            if ($body.find(`div[data-cy*='title-recipe']`).length >= 16) {
                // Verify pagination bar exists
                homePageUI.paginationBar.should('exist');
                homePageUI.paginationPrevious.should('be.visible');
                homePageUI.paginationNext.should('be.visible');
                cy.log('Greater than or equal to 16 items, pagination is applicable');

                //Verify the Result displays exactly 16 items on each page.
                cy.get(`div[data-cy*='title-recipe']`).should('have.length', 16);
            }
            //Else if the number of items below 16, pagination is applicable
            else {
                // Verify pagination bar does not exist
                homePageUI.paginationBar.should('not.exist');
                cy.log('Less than 16 items, pagination not applicable');
            }
        })

        //Verify default sort "Featured" is selected
        homePageUI.sortDefault.should('contains.text', 'Featured');
        //Select sort by "Publication date"
        homePageUI.sortDefault.click();
        homePageUI.sortPublicationDate.click();
        //Verify sort by "Publication date" is selected
        homePageUI.sortDefault.should('contains.text', 'Publication Date')
        homePageUI.sortDefault.should('not.contains.text', 'Featured');
    });

    it.skip('iframe test', () => {
        /// <reference types="cypress" />
        // cy.visit('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')

        //Scenario 01
        // cy.xpath('//iframe[@id="iframeResult"]').its('0.contentDocument.body').then(cy.wrap).xpath('//h1[text()="The iframe element"]').should('be.visible');
        /*In here we are accessing the document body through jQuey and wrapping the result of that (the body of iframe itself)
        inside the 'cy' element so that we can access it through that. */

        //Scenario 02
        // cy.xpath('//h1[text()="The iframe element"]').should('not.be.visible');
        //Cypress will not find this as it is inside an iframe.



        cy.visit('https://www.amazon.com');

        cy.get(`iframe[class*='aut-iframe']`).should('not.empty')
        cy.get(`iframe[class*='aut-iframe']`).its('0.contentDocument.body').should('not.empty')
        // .should('not.empty')
        //     .its('0.contentDocument.body')
        // .should(body => {
        //   expect(Cypress.$(body).has('#searchDropdownBox').length).gt(0)
        // })
        // .then(cy.wrap)

        cy.get(`iframe[class*='aut-iframe']`).its('0.contentDocument.body').should('not.empty')
        //     .find('iframe')
        // .then(($el) => {
        //   if (!$el || $el.length === 0) {
        //     return cy.wrap(null);
        //   }
        //   return cy.wrap($el[0].contentWindow?.document.body.querySelector(elementSelector));
        // });

        // .its('0.contentDocument.body')
        // .should('be.visible')
        // .then(cy.wrap);

        // .should('not.be.empty').its('0.contentDocument.body')
        // .then($all => {
        //     cy.log("all: " + $all)  
        // })

        //.its('0.contentDocument.body').then(cy.wrap).xpath(`//*[@id='searchDropdownBox']`).should('be.visible');
        // cy.get('#searchDropdownBox').should('be.visible');
        // cy.get('#searchDropdownBox').should('be.not.visible');

        // cy.get('#searchDropdownBox').select('Books')

        //cy.get('#searchDropdownBox').select('Books', { force: true })
        // Perform a search for "chẳng thể hiểu"
        cy.get('#twotabsearchtextbox').clear().type('apple');
        cy.get('#nav-search-submit-button').click();
        // cy.get(`li[aria-label='English']`).click({ force: true });

        cy.contains('English').click({ force: true });
        //Verify Page title is "Amazon.com : apple"
        cy.title().should('include', 'Amazon.com : apple')

        // After performing the search and receiving the number of items, check for pagination
        // cy.get('.aut-iframe').its('body').then((body) => { cy.wrap(body).should('...') }
        cy.get(`div[data-cy*='title-recipe']`).should('be.visible');

        cy.get('body').then($body => {
            if ($body.find(`div[data-cy*='title-recipe']`).length >= 16) {
                //Verify items display = 16
                cy.get(`div[data-cy*='title-recipe']`).should('have.length', 16);
                cy.log('Greater than or equal to 16 items, pagination is applicable');

                // Verify pagination element exists
                cy.get(`.s-pagination-strip`).should('exist');
                cy.get('.s-pagination-previous').should('be.visible');
                cy.get('.s-pagination-next').should('be.visible');
            }
            else {
                cy.log('Less than 16 items, pagination not applicable');
                // Verify pagination exists
                cy.get(`.s-pagination-strip`).should('not.exist');
            }
        })

        //Verify default sort "Featured" is selected
        cy.get('.a-dropdown-prompt').should('have.text', 'Featured', { matchCase: false });

        //Select sort by "Publication date"
        cy.get('.a-dropdown-prompt').click();
        cy.get('#s-result-sort-select_4').click();
        //Verify sort by "Publication date" is selected
        cy.get('.a-dropdown-prompt').contains('Publication date', { matchCase: false })
        // cy.get('.a-dropdown-prompt').should('have.text', 'Publication Date', { matchCase: false });
        cy.get('.a-dropdown-prompt').should('not.have.text', 'Featured');


        /*
        //Check if the items are sorted by "Publication date"

        //Way 1: using iframe
        cy.get(`iframe[class='aut-iframe']`)
        .should('not.be.visible')
        .then(($iframe) => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
                .find(`span[class='a-size-base a-color-secondary a-text-normal']`).as('dateElements');
// Retrieve dates from the elements
cy.get('@dateElements').then($dateElements => {
    cy.log("dateElements: " + $dateElements)
  const dates = $dateElements.map((index, element) => Cypress.$(element).text()).get();
  const datesTimestamp = dates.map(date => new Date(date).getTime());

  // Check if dates are in descending order
  const isSortedDescending = datesTimestamp.every((date, i, arr) => i === 0 || date >= arr[i - 1]);

  // Assert that the dates are sorted in descending order
  expect(isSortedDescending).to.be.true;
});
        })

        //Way 2: Without iframe
        /*
        // cy.get('.a-row > .a-size-base.a-color-secondary.a-text-normal').as('dateElements');
        cy.get(`span[class='a-size-base a-color-secondary a-text-normal']`).as('dateElements');
        // Retrieve dates from the elements
        cy.get('@dateElements').then($dateElements => {
            cy.log("dateElements: " + $dateElements)
          const dates = $dateElements.map((index, element) => Cypress.$(element).text()).get();
          const datesTimestamp = dates.map(date => new Date(date).getTime());
    
          // Check if dates are in descending order
          const isSortedDescending = datesTimestamp.every((date, i, arr) => i === 0 || date >= arr[i - 1]);
    
          // Assert that the dates are sorted in descending order
          expect(isSortedDescending).to.be.true;
        });

        */
        //End of check

        // cy.get('#s-result-sort-select_0').should('be.disabled');
        // cy.get('#s-result-sort-select_0').should('be.visible');

        // cy.get('[data-asin="B0CP3C5HJN"] > .sg-col-inner > .s-widget-container > .a-declarative > .puis-card-container > :nth-child(1) > :nth-child(1) > .puisg-col-8-of-16 > :nth-child(1) > .a-spacing-small > [data-cy="title-recipe"] > .a-row.a-size-base > .a-row > .a-text-normal').should('have.text', 'Sep 3, 2024');
        // cy.get('[data-asin="1682774007"] > .sg-col-inner > .s-widget-container > .a-declarative > .puis-card-container > :nth-child(1) > :nth-child(1) > .puisg-col-8-of-16 > :nth-child(1) > .a-spacing-small > [data-cy="title-recipe"] > .a-row.a-size-base > .a-row > .a-text-normal').should('have.text', 'Aug 13, 2024');
        // cy.get('[data-asin="1975351037"] > .sg-col-inner > .s-widget-container > .a-declarative > .puis-card-container > :nth-child(1) > :nth-child(1) > .puisg-col-8-of-16 > :nth-child(1) > .a-spacing-small > [data-cy="title-recipe"] > .a-row.a-size-base > .a-row > .a-text-normal').should('have.text', 'Feb 20, 2024');
        // cy.get('[data-asin="B0CP3C5HJN"] > .sg-col-inner > .s-widget-container > .a-declarative > .puis-card-container > :nth-child(1) > :nth-child(1) > .puisg-col-8-of-16 > :nth-child(1) > .a-spacing-small > [data-cy="title-recipe"] > .a-row.a-size-base > .a-row > .a-text-normal').should('be.visible');

    });
    it.skip('search', function () {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('https://www.amazon.com');
        cy.get('#searchDropdownBox').select('search-alias=stripbooks-intl-ship');
        cy.get('#twotabsearchtextbox').clear().type('chẳng thể hiểu');
        // cy.get('#twotabsearchtextbox').clear().type('apple');
        cy.get('#nav-search-submit-button').click();


        cy.get(`li[aria-label='Chinese (Simplified)']`).click();

        cy.get(`li[aria-label='English']`).click();

        'Amazon.com: Apple - English'

        // cy.get('.s-pagination-previous').should('be.visible');
        // cy.get('.s-pagination-next').should('be.visible');
        // cy.get('[href="/s?k=apple&i=stripbooks-intl-ship&rh=n%3A283155%2Cp_n_feature_nine_browse-bin%3A3291437011&dc&page=2&crid=3S7U6JZY0RTIU&qid=1703898647&rnid=3291435011&sprefix=apple%2Cstripbooks-intl-ship%2C564&ref=sr_pg_2"]').should('be.visible');
        // cy.get('[data-index="20"] > .s-widget-container > .a-section').should('be.visible');
        // cy.get('.a-dropdown-prompt').click();
        // cy.get('#s-result-sort-select_4').click();
        // cy.get('[data-asin="B0CP3C5HJN"] > .sg-col-inner > .s-widget-container > .a-declarative > .puis-card-container > :nth-child(1) > :nth-child(1) > .puisg-col-8-of-16 > :nth-child(1) > .a-spacing-small > [data-cy="title-recipe"] > .a-row.a-size-base > .a-row > .a-text-normal').should('have.text', 'Sep 3, 2024');
        // cy.get('[data-asin="1682774007"] > .sg-col-inner > .s-widget-container > .a-declarative > .puis-card-container > :nth-child(1) > :nth-child(1) > .puisg-col-8-of-16 > :nth-child(1) > .a-spacing-small > [data-cy="title-recipe"] > .a-row.a-size-base > .a-row > .a-text-normal').should('have.text', 'Aug 13, 2024');
        // cy.get('[data-asin="1975351037"] > .sg-col-inner > .s-widget-container > .a-declarative > .puis-card-container > :nth-child(1) > :nth-child(1) > .puisg-col-8-of-16 > :nth-child(1) > .a-spacing-small > [data-cy="title-recipe"] > .a-row.a-size-base > .a-row > .a-text-normal').should('have.text', 'Feb 20, 2024');
        // cy.get('[data-asin="B0CP3C5HJN"] > .sg-col-inner > .s-widget-container > .a-declarative > .puis-card-container > :nth-child(1) > :nth-child(1) > .puisg-col-8-of-16 > :nth-child(1) > .a-spacing-small > [data-cy="title-recipe"] > .a-row.a-size-base > .a-row > .a-text-normal').should('be.visible');
        // /* ==== End Cypress Studio ==== */
    });
    it.skip('search2', function () {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('https://www.amazon.com');
        cy.get('#nav-bb-logo').click();
        cy.get('#searchDropdownBox').select('search-alias=stripbooks-intl-ship');
        cy.get('#twotabsearchtextbox').click();
        cy.get('#twotabsearchtextbox').click();
        cy.get('#twotabsearchtextbox').click();
        cy.get('#twotabsearchtextbox').should('be.visible');
        cy.get('#twotabsearchtextbox').clear('a');
        cy.get('#twotabsearchtextbox').type('chẳng thể hiểu');
        cy.get('#nav-search-submit-button').click();
        /* ==== End Cypress Studio ==== */
    });
    it.skip('Verify sorted - does not work', () => {
        cy.get('#searchDropdownBox').select('Books', { force: true })
        // Perform a search for "chẳng thể hiểu"
        cy.get('#twotabsearchtextbox').clear().type('apple');
        cy.get('#nav-search-submit-button').click();
        // cy.get(`li[aria-label='English']`).click({ force: true });

        cy.contains('English').click({ force: true });
        //Verify Page title is "Amazon.com : apple"
        cy.title().should('include', 'Amazon.com : apple')

        // After performing the search and receiving the number of items, check for pagination
        // cy.get('.aut-iframe').its('body').then((body) => { cy.wrap(body).should('...') }
        cy.get(`div[data-cy*='title-recipe']`).should('be.visible');

        cy.get('body').then($body => {
            if ($body.find(`div[data-cy*='title-recipe']`).length >= 16) {
                //Verify items display = 16
                cy.get(`div[data-cy*='title-recipe']`).should('have.length', 16);
                cy.log('Greater than or equal to 16 items, pagination is applicable');

                // Verify pagination element exists
                cy.get(`.s-pagination-strip`).should('exist');
                cy.get('.s-pagination-previous').should('be.visible');
                cy.get('.s-pagination-next').should('be.visible');
            }
            else {
                cy.log('Less than 16 items, pagination not applicable');
                // Verify pagination exists
                cy.get(`.s-pagination-strip`).should('not.exist');
            }
        })

        //Verify default sort "Featured" is selected
        cy.get('.a-dropdown-prompt').should('have.text', 'Featured', { matchCase: false });

        //Select sort by "Publication date"
        cy.get('.a-dropdown-prompt').click();
        cy.get('#s-result-sort-select_4').click();
        //Verify sort by "Publication date" is selected
        cy.get('.a-dropdown-prompt').contains('Publication date', { matchCase: false })
        // cy.get('.a-dropdown-prompt').should('have.text', 'Publication Date', { matchCase: false });
        cy.get('.a-dropdown-prompt').should('not.have.text', 'Featured');


        //Check if the items are sorted by "Publication date"
        //Way 2: Without iframe
        // cy.get('.a-row > .a-size-base.a-color-secondary.a-text-normal').as('dateElements');
        // cy.get(`span[class='a-size-base a-color-secondary a-text-normal']`).as('dateElements');
        // // Retrieve dates from the elements
        // cy.get('@dateElements').then($dateElements => {
        //     cy.log("dateElements: " + $dateElements)
        //   const dates = $dateElements.map((index, element) => Cypress.$(element).text()).get();
        //   const datesTimestamp = dates.map(date => new Date(date).getTime());

        //   // Check if dates are in descending order
        //   const isSortedDescending = datesTimestamp.every((date, i, arr) => i === 0 || date >= arr[i - 1]);

        //   // Assert that the dates are sorted in descending order
        //   expect(isSortedDescending).to.be.true;
        // });
        //End of check

    });
})