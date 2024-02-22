import SignupPageUI from '../../../../pageUIs/MathGPT/Educator/SignupPageUI'
import HomePageUI from '../../../../pageUIs/MathGPT/Educator/HomePageUI'

const signupPage = new SignupPageUI();
const homePageEdu = new HomePageUI();

describe('Test Suite 1', function () {

    beforeEach(function () {
        cy.fixture('data').then(function (data) {
            this.data = data;
        })

        cy.fixture('invalidCredentials_Signup').then(function (invalidCredentials_Signup) {
            //get data from invalidCredentials_Signup.json
            this.invalidCredentials_Signup = invalidCredentials_Signup;
        })

    })

    it('TC1: Sign up as Educator role unsuccessfully', function () {
        // Visit MathGPT DEV;
        cy.visit('/signup?role=educator');

        //Verify that current page is 'Create an Instructor account' page
        cy.textVisible('Create an Instructor account');
        cy.textVisible('First name');
        cy.textVisible('Last name');
        cy.textVisible('Email');
        cy.textVisible('Password');
        cy.textVisible('Show');
        cy.textVisible('Must contain at least 8 letters.');
        cy.textVisible('By creating an account, you agree to MathGPT’s');
        cy.textVisible('Terms of Service');
        cy.textVisible('Privacy Policy');
        cy.textVisible('Already have an account?');
        signupPage.signupButton.should('be.visible')

        //sign up without information
        signupPage.signupButton.click()
        signupPage.signupButton.should('be.disabled')
        cy.textVisible('Please enter your first name.');
        cy.textVisible('Please enter your last name.');
        cy.textVisible('Please enter your email address.');
        cy.textVisible('Please enter your password.');

        //global variable
        for (var index in this.invalidCredentials_Signup) {
            signupPage.firstNameInput.clear().type(this.invalidCredentials_Signup[index].firstName)
            signupPage.lastNameInput.clear().type(this.invalidCredentials_Signup[index].lastName)
            signupPage.passwordInput.clear().type(this.invalidCredentials_Signup[index].password)
            signupPage.emailInput.clear().type(this.invalidCredentials_Signup[index].email)
            signupPage.signupButton.should('be.enabled')
            signupPage.signupButton.click()
            signupPage.messageContent.should('contain.text', this.invalidCredentials_Signup[index].errorMessage1);
        }

    })

    it('TC2: Sign up as Educator role successfully', function () {
        // Visit MathGPT DEV;
        cy.visit('/signup?role=educator');

        //Verify that current page is 'Create an Instructor account' page
        cy.textVisible('Create an Instructor account');
        cy.textVisible('First name');
        cy.textVisible('Last name');
        cy.textVisible('Email');
        cy.textVisible('Password');
        cy.textVisible('Show');
        cy.textVisible('Must contain at least 8 letters.');
        cy.textVisible('By creating an account, you agree to MathGPT’s');
        cy.textVisible('Terms of Service');
        cy.textVisible('Privacy Policy');
        cy.textVisible('Already have an account?');
        signupPage.signupButton.should('be.visible')

        //generate fake data and write to dataFake.json
        cy.generateFakeData()

        //get data from dataFake.json
        cy.fixture('dataFake').then(function (dataFake) {
            //get data from dataFake.json
            //sign up with valid email
            const email = 'edu+' + dataFake.randTime + '@gotitapp.co';
            const password = `Aa123456@`;
            const firstName = dataFake.randTime

            signupPage.firstNameInput.clear().type(firstName)
            signupPage.lastNameInput.clear().type('edu')
            signupPage.passwordInput.clear().type(password)
            signupPage.emailInput.clear().type(email)
            signupPage.signupButton.should('be.enabled')
            signupPage.signupButton.click()

            //save account after successful registration in realEduAccount.json
            cy.writeDataToFile('cypress/fixtures/realEduAccount.json', email, password, firstName)

            //Verify Educator register successfully and is redirected to Home Page
            homePageEdu.greatingMessage.should('contain.text', 'Welcome, ' + dataFake.randTime + '!');
            homePageEdu.instructorSummary.should('contain.text', 'Manage your courses and students, all in one place!');
            // homePageEdu.createCourseSummary.should('contain.text', 'Begin your teaching journey with MathGPT by creating your first course today!');

        })


    })

})