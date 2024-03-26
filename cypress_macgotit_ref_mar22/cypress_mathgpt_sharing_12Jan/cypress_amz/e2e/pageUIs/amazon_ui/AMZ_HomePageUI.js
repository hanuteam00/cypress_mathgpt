//Using css selector to find elements on each page
const SIGN_IN_BUTTON = '#nav-link-accountList';
const ACCOUNT_MENU = `#nav-link-accountList`;
const MANAGE_PROFILE = `.sc-ksBlkl`;
const DEPARTMENT_LIST = `#searchDropdownBox`;
const SEARCH_BOX = `#twotabsearchtextbox`;
const SUBMIT_SEARCH = `#nav-search-submit-button`;
const PAGINATION_BAR = `.s-pagination-strip`;
const PAGINATION_PREVIOUS = `.s-pagination-previous`;
const PAGINATION_NEXT = `.s-pagination-next`;
const ENGLISH_LANGUAGE = `li[aria-label='English'] > span > a >span`;
const SORT_DEFAULT = `.a-dropdown-prompt`;
const SORT_PUBLICATION_DATE = `#s-result-sort-select_4`;


//Create a class to store all elements on each page, and export it to use in test cases level
export default class LoginPageUI {
    //get pageUrl
    get pageUrl() {return cy.url();}
    //get pageTitle
    get pageTitle() {return cy.title();}
    //get signInButton
    get signInButton() {return cy.get(SIGN_IN_BUTTON);}
    get accountMenu() {return cy.get(ACCOUNT_MENU);}
    get manageProfile() {return cy.get(MANAGE_PROFILE);}
    get departmentList() {return cy.get(DEPARTMENT_LIST);}
    get searchBox() {return cy.get(SEARCH_BOX);}
    get submitSearch() {return cy.get(SUBMIT_SEARCH);}
    get paginationBar() {return cy.get(PAGINATION_BAR);}
    get paginationPrevious() {return cy.get(PAGINATION_PREVIOUS);}
    get paginationNext() {return cy.get(PAGINATION_NEXT);}
    get englishLanguage() {return cy.get(ENGLISH_LANGUAGE);}
    get sortDefault() {return cy.get(SORT_DEFAULT);}
    get sortPublicationDate() {return cy.get(SORT_PUBLICATION_DATE);}
}