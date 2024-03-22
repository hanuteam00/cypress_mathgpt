//Step 1: Using css selector to find elements on each page
const CONTACT_US_BUTTON = `.u-sizeFull > .u-marginTopMedium > .Button`;
const LOG_IN_BUTTON_MAIN = `button[class*='Dropdown-button']`
const LOGIN_INSTRUCTOR = '.Dropdown-container > :nth-child(1)';
const LOGIN_STUDENT = '.Dropdown-container > :nth-child(2)';
const EMAIL_INPUT = `input[placeholder='Enter your email address']`;
const CONTINUE_BUTTON = `button[type='submit']`
const LOG_IN_BUTTON = `button[type='submit']`
const VERIFY_CODE = `[name='verifyCode']`;
// const CONTINUE_BUTTON_2 = '.Button > .u-flex';

const SIGN_IN_TITLE = '.Title';
const PASSWORD_INPUT = '#password';
const SIGN_IN_BUTTON = '.u-marginTopMedium';
const SIGN_IN_GOOGLE_BUTTON = `button[data-testid='google-button-sign-in']`;
// const ERROR_MESSAGE_1 = `div[role='alert']`;
const ERROR_MESSAGE_1 = `div[class='FormGroup u-block u-marginBottomSmall u-marginBottomSmall'] div[role='alert']`;
const ERROR_MESSAGE_2 = `div[class='FormGroup u-block u-marginBottomSmall u-marginBottomMedium'] div[role='alert']`;

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class LoginPageUI {
    // class homePage{
    //Step 3: Create methods to interact with elements on each page in test case level
    // launchApp : () => cy.visit('https://exp.mathgpt.ai/');

    //way1: store elements as properties of class
    elements = {
        url: () => cy.url(),
        contactUs: () => cy.get(CONTACT_US_BUTTON),
        loginButton1: () => cy.get(LOG_IN_BUTTON_1),
        loginInstructor: () => cy.get(LOGIN_INSTRUCTOR),
        loginStudent: () => cy.get(LOGIN_STUDENT),
        emailInput: () => cy.get(EMAIL_INPUT),
        continueButton: () => cy.get(CONTINUE_BUTTON),
        verifyCode: () => cy.get(VERIFY_CODE),
        loginButton: () => cy.get(LOG_IN_BUTTON),
        signInTitle: () => cy.get(SIGN_IN_TITLE),
        passwordInput: () => cy.get(PASSWORD_INPUT),
        signInButton: () => cy.get(SIGN_IN_BUTTON),
        signInGoogleButton: () => cy.get(SIGN_IN_GOOGLE_BUTTON),
        errorMessage1: () => cy.get(ERROR_MESSAGE_1),
        errorMessage2: () => cy.get(ERROR_MESSAGE_2),

    }

    //way2: store elements as getter methods of class
    get url() {return cy.url();}
    get contactUs() {return cy.get(CONTACT_US_BUTTON);}
    get loginButtonMain() {return cy.get(LOG_IN_BUTTON_MAIN);}
    get loginInstructor() {return cy.get(LOGIN_INSTRUCTOR);}
    get loginStudent() {return cy.get(LOGIN_STUDENT);}
    get emailInput() {return cy.get(EMAIL_INPUT);}
    get continueButton() {return cy.get(CONTINUE_BUTTON);}
    get verifyCode() {return cy.get(VERIFY_CODE);}
    get loginButton() {return cy.get(LOG_IN_BUTTON);}
    get signInTitle() {return cy.get(SIGN_IN_TITLE);}
    get passwordInput() {return cy.get(PASSWORD_INPUT);}
    get signInButton() {return cy.get(SIGN_IN_BUTTON);}
    get signInGoogleButton() {return cy.get(SIGN_IN_GOOGLE_BUTTON);}
    get errorMessage1() {return cy.get(ERROR_MESSAGE_1);}
    get errorMessage2() {return cy.get(ERROR_MESSAGE_2);}


}

// module.exports = new homePage();