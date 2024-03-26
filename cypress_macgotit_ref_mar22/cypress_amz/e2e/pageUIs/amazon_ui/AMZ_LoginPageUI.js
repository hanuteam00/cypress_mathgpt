//Using css selector to find elements on each page
const TEXT1 = `label[for='ap_email']`;
const TEXT2 = `h5[aria-level='5']`;
const TEXT3 = `#createAccountSubmit`;
const EMAIL_INPUT = `#ap_email`;
const CONTINUE_BUTTON = `.a-button-input`;
const EMAIL_ALERT_BOTTOM_CONTENT = `#auth-email-missing-alert >> .a-alert-content`;
const EMAIL_ALERT_HEADING = `#auth-error-message-box >> .a-alert-heading`;
const EMAIL_ALERT_HEADING_CONTENT = `.a-list-item`;
const EMAIL_DISPLAYED = `span[dir='ltr']`;
const CHANGE_ACCOUNT = `#ap_change_login_claim`;
const PASSWORD_LABEL = `.a-span5 > .a-form-label`;
const FORGOT_PASSWORD = `#auth-fpp-link-bottom`;
const REMEMBER_LOGIN = `.a-label`;
const PASSWORD_INPUT = `#ap_password`;
const SUBMIT_SIGNIN = `#signInSubmit`;
const PASSWORD_ALERT_BOTTOM_CONTENT = `#auth-password-missing-alert > .a-box-inner > .a-alert-content`;
const PASSWORD_ALERT_HEADING = `#auth-error-message-box > .a-box-inner > .a-alert-heading`;
const PASSWORD_ALERT_HEADING_CONTENT = `.a-list-item`;

//Create a class to store all elements on each page, and export it to use in test cases level
export default class LoginPageUI {
    //get pageUrl
    get pageUrl() {return cy.url();}
    //get pageTitle
    get pageTitle() {return cy.title();}
    //get texts in Email page
    get text1() {return cy.get(TEXT1);}
    get text2() {return cy.get(TEXT2);}
    get text3() {return cy.get(TEXT3);}
    get emailInput() {return cy.get(EMAIL_INPUT);}
    get continueButton() {return cy.get(CONTINUE_BUTTON);}
    get emailAlertBottomContent() {return cy.get(EMAIL_ALERT_BOTTOM_CONTENT);}
    get emailAlertHeading() {return cy.get(EMAIL_ALERT_HEADING);}
    get emailAlertHeadingContent() {return cy.get(EMAIL_ALERT_HEADING_CONTENT);}
    get emailDisplayed() {return cy.get(EMAIL_DISPLAYED);}
    get changeAccount() {return cy.get(CHANGE_ACCOUNT);}
    get passwordLabel() {return cy.get(PASSWORD_LABEL);}
    get forgotPassword() {return cy.get(FORGOT_PASSWORD);}
    get rememberLogin() {return cy.get(REMEMBER_LOGIN);}
    get passwordInput() {return cy.get(PASSWORD_INPUT);}
    get submitSignin() {return cy.get(SUBMIT_SIGNIN);}
    get passwordAlertBottomContent() {return cy.get(PASSWORD_ALERT_BOTTOM_CONTENT);}
    get passwordAlertHeading() {return cy.get(PASSWORD_ALERT_HEADING);}
    get passwordAlertHeadingContent() {return cy.get(PASSWORD_ALERT_HEADING_CONTENT);}
}