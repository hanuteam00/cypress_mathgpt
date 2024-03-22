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
})