import LoginPageUI from '../../../../pageUIs/MathGPT/Educator/LoginPageUI'
import HomePageUI from '../../../../pageUIs/MathGPT/Educator/HomePageUI'
import ForgotPasswordPageUI from '../../../../pageUIs/MathGPT/Educator/ForgotPasswordPageUI'

const loginPageEdu = new LoginPageUI();
const homePageEdu = new HomePageUI();
const forgotPasswordEdu = new ForgotPasswordPageUI();

describe('Test Suite 1', function () {

    beforeEach(function () {
        cy.fixture('data').then(function (data) {
            this.data = data;
        })
        //generate fake data and write to dataFake.json
        cy.generateFakeData()
        //get data from dataFake.json
        cy.fixture('dataFake').then(function (dataFake) {
            //get data from dataFake.json
            this.dataFake = dataFake;
        })

        cy.fixture('realEduAccount').then(function (realEduAccount) {
            //get data from invalidLogin.json
            this.realEduAccount = realEduAccount;
        })

    })

    it('TC1: Forgot Password unsuccessfuly', function () {
        cy.visit('/forgot-password?role=educator');

        //Verify that current page is 'Instructor login' page
        cy.textVisible('Reset your Instructor password');
        cy.textVisible('Enter your email and we will send you a link to reset your password.');
        cy.textVisible('Send link to email');
        forgotPasswordEdu.sendLinkToEmail.should('be.visible')

        //Let blank email and password and click on "Log in" button
        forgotPasswordEdu.emailInput.focus().blur();
        forgotPasswordEdu.sendLinkToEmail.click({force: true});
        //verify error message
        forgotPasswordEdu.errorMessage.should('contain.text', 'Please enter your email address.');

        //Input invalid email type
        forgotPasswordEdu.emailInput.clear().type('edu');
        //verify error message
        forgotPasswordEdu.errorMessage.should('contain.text', 'Please enter a valid email address.');

        //Input non-existing email
        forgotPasswordEdu.emailInput.clear().type('gotit+nonexisting@gotitapp.co');
        forgotPasswordEdu.sendLinkToEmail.click();
        //verify error message
        forgotPasswordEdu.errorPopup.should('contain.text', 'We could not find the account associated with that email.')
        
    })
    it('TC2: Forgot password successfuly', function () {
        cy.visit('/forgot-password?role=educator');

        //Verify that current page is 'Instructor login' page
        cy.textVisible('Reset your Instructor password');
        cy.textVisible('Enter your email and we will send you a link to reset your password.');
        cy.textVisible('Send link to email');
        forgotPasswordEdu.sendLinkToEmail.should('be.visible')

        //Input existing email type
        forgotPasswordEdu.emailInput.clear().type('manh+edu1@mailnesia.com');
        forgotPasswordEdu.sendLinkToEmail.click();

        //verify "Email sent" message is displayed
        cy.textVisible('Email sent');
        cy.textVisible('Check your email and open the link we sent to continue.');
        forgotPasswordEdu.loginButton.should('be.visible')

        //Verify Educator login successfully and is redirected to Home Page
        // homePageEdu.greatingMessage.should('contain.text', 'Welcome, ' + this.realEduAccount[0].firstName);
        // homePageEdu.instructorSummary.should('contain.text', 'Manage your courses and students, all in one place!');

        //Go to mailnesia site to get "Reset Password" link
        cy.visit('https://mailnesia.com/mailbox/manh+edu1');
        forgotPasswordEdu.mailBox.click()
        forgotPasswordEdu.firstEmail.click();
        forgotPasswordEdu.setNewPassword.click();

        //Verify that user is navigated to "Reset your Instructor password" screen
        cy.textVisible('Reset your Instructor password');
        cy.textVisible('Enter your new password. Password must contain at least 8 letters.');
        cy.textVisible('New password');
        cy.textVisible('Show');
        cy.textVisible('Reset password');
        forgotPasswordEdu.newPasswordInput.clear().type('Aa123456@');
        forgotPasswordEdu.verifyNewPasswordButton.click();

        //Verify that user is navigated to successful "Password reset" screen
        cy.textVisible('Password reset');
        cy.textVisible('Log in now');
        forgotPasswordEdu.loginNowButton.click();

        //Verify that user is navigated to "Login" screen
        //And user can use new password to login
        loginPageEdu.emailInput.clear().type('manh+edu1@mailnesia.com');
        loginPageEdu.passwordInput.clear().type('Aa123456@');
        loginPageEdu.loginButton.click();

        homePageEdu.greatingMessage.should('contain.text', 'Welcome');
        homePageEdu.instructorSummary.should('contain.text', 'Manage your courses and students, all in one place!');
    })
})