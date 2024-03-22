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

    it('TC4: Verify result list can be sorted on demand', () => {
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

})