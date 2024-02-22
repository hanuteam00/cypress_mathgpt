//Step 1: Using css selector to find elements on each page

const SEND_LINK_TO_EMAIL_BUTTON = `button:last-child`;
const EMAIL_INPUT = `input[name='email']`;
const ERROR_MESSAGE = `.u-flex.u-gapTiny.u-alignItemsStart >div:last-child`;
const ERROR_POPUP = `div[class='u-textWordBreak'] span`;
const LOGIN_BUTTON = `.Button-label.u-inlineBlock`;
const MAILBOX = `#sm`;
const FIRST_EMAIL = `tbody>tr:first-child`;
const SET_NEW_PASSWORD_BUTTON = `a[style*='text-decoration']`;
const NEW_PASSWORD_INPUT = `.FormInput`;
const VERIFY_NEW_PASSWORD_BUTTON = `.Button`;
const LOGIN_NOW_BUTTON = `.Button`;


//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class ForgotPasswordPageUI {
    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get sendLinkToEmail() { return cy.get(SEND_LINK_TO_EMAIL_BUTTON); }
    get emailInput() { return cy.get(EMAIL_INPUT); }
    get errorMessage() { return cy.get(ERROR_MESSAGE); }
    get errorPopup() { return cy.get(ERROR_POPUP); }
    get loginButton() { return cy.get(LOGIN_BUTTON); }
    get mailBox() { return cy.get(MAILBOX); }
    get firstEmail() { return cy.get(FIRST_EMAIL); }
    get setNewPassword() { return cy.get(SET_NEW_PASSWORD_BUTTON); }
    get newPasswordInput() { return cy.get(NEW_PASSWORD_INPUT); }
    get verifyNewPasswordButton() { return cy.get(VERIFY_NEW_PASSWORD_BUTTON); }
    get loginNowButton() { return cy.get(LOGIN_NOW_BUTTON); }

    //way2: store elements as properties of class
    elements = {
        url: () => cy.url(),
        sendLinkToEmail: () => cy.get(SEND_LINK_TO_EMAIL_BUTTON),
        emailInput: () => cy.get(EMAIL_INPUT),
        errorMessage: () => cy.get(ERROR_MESSAGE),
        errorPopup: () => cy.get(ERROR_POPUP),
        loginButton: () => cy.get(LOGIN_BUTTON),
        mailBox: () => cy.get(MAILBOX),
        firstEmail: () => cy.get(FIRST_EMAIL),
        setNewPassword: () => cy.get(SET_NEW_PASSWORD_BUTTON),
        newPasswordInput: () => cy.get(NEW_PASSWORD_INPUT),
        verifyNewPasswordButton: () => cy.get(VERIFY_NEW_PASSWORD_BUTTON),
        loginNowButton: () => cy.get(LOGIN_NOW_BUTTON),

    }

}