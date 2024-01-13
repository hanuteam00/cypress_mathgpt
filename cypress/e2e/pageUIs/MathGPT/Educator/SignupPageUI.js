//Step 1: Using css selector to find elements on each page

const FIRST_NAME_INPUT = `input[name='firstName']`;
const LAST_NAME_INPUT = `input[name='lastName']`;
const EMAIL_INPUT = `input[name='email']`;
const PASSWORD_INPUT = `input[name='password']`;
const SIGNUP_BUTTON = `form.u-widthFull > .Button`;
const SIGNUP_WITH_GOOGLE_BUTTON = `button[data-testid$='google-login-button']`;
const LOGIN_BUTTON = `[class^='u-marginTopMedium'] > button`;
const MESSAGE_CONTENT = `.Message-content`;

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class SignupPageUI {
    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get firstNameInput() { return cy.get(FIRST_NAME_INPUT); }
    get lastNameInput() { return cy.get(LAST_NAME_INPUT); }
    get emailInput() { return cy.get(EMAIL_INPUT); }
    get passwordInput() { return cy.get(PASSWORD_INPUT); }
    get signupButton() { return cy.get(SIGNUP_BUTTON); }
    get signupWithGoogleButton() { return cy.get(SIGNUP_WITH_GOOGLE_BUTTON); }
    get loginButton() { return cy.get(LOGIN_BUTTON); }
    get messageContent() { return cy.get(MESSAGE_CONTENT); }

    //way2: store elements as properties of class
    elements = {
        url: () => cy.url(),
        firstNameInput: () => cy.get(FIRST_NAME_INPUT),
        lastNameInput: () => cy.get(LAST_NAME_INPUT),
        emailInput: () => cy.get(EMAIL_INPUT),
        passwordInput: () => cy.get(PASSWORD_INPUT),
        signupButton: () => cy.get(SIGNUP_BUTTON),
        signupWithGoogleButton: () => cy.get(SIGNUP_WITH_GOOGLE_BUTTON),
        loginButton: () => cy.get(LOGIN_BUTTON),
        messageContent: () => cy.get(MESSAGE_CONTENT),
       
    }

}