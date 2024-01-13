//Step 1: Using css selector to find elements on each page

const EMAIL_INPUT = `input[name='email']`;
const PASSWORD_INPUT = `input[name='password']`;
const FORGOT_PASSWORD_BUTTON = `form.u-widthFull > .Button:nth-of-type(1)`;
const LOGIN_BUTTON = `form.u-widthFull > .Button:nth-of-type(2)`;
const LOGIN_WITH_GOOGLE_BUTTON = `button[data-testid$='google-login-button']`;
const SIGNUP_BUTTON =`div[class^='u-marginTopMedium']>button`
const EMAIL_ERROR = `form[class='u-widthFull'] > div:first-of-type > div > div> div:last-child`;
const PASSWORD_ERROR = `form[class='u-widthFull'] > div:last-of-type > div > div> div:last-child`;
const MESSAGE_CONTENT = `.Message-content`;

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class SignupPageUI {
    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get emailInput() { return cy.get(EMAIL_INPUT); }
    get passwordInput() { return cy.get(PASSWORD_INPUT); }
    get forgotPasswordButton() { return cy.get(FORGOT_PASSWORD_BUTTON); }
    get loginButton() { return cy.get(LOGIN_BUTTON); }
    get loginWithGoogleButton() { return cy.get(LOGIN_WITH_GOOGLE_BUTTON); }
    get signupButton() { return cy.get(SIGNUP_BUTTON); }
    get emailError() { return cy.get(EMAIL_ERROR); }
    get passwordError() { return cy.get(PASSWORD_ERROR); }
    get messageContent() { return cy.get(MESSAGE_CONTENT); }

    //way2: store elements as properties of class
    elements = {
        url: () => cy.url(),
        emailInput: () => cy.get(EMAIL_INPUT),
        passwordInput: () => cy.get(PASSWORD_INPUT),
        forgotPasswordButton: () => cy.get(FORGOT_PASSWORD_BUTTON),
        loginButton: () => cy.get(LOGIN_BUTTON),
        loginWithGoogleButton: () => cy.get(LOGIN_WITH_GOOGLE_BUTTON),
        signupButton: () => cy.get(SIGNUP_BUTTON),
        emailError: () => cy.get(EMAIL_ERROR),
        passwordError: () => cy.get(PASSWORD_ERROR),
        messageContent: () => cy.get(MESSAGE_CONTENT),

    }
}