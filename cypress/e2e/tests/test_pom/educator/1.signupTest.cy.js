import signupPageEduUI from '../../pageUIs/Educator/signupPageEduUI'
import HomePageUI from '../../pageUIs/Educator/HomePageUI'
import LandingPageUI from '../../pageUIs/Common/LandingPageUI'

const signupPageEdu = new signupPageEduUI();
const homePageEdu = new HomePageUI();
const landingPageCommon = new LandingPageUI();

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
        signupPageEdu.signupButton.should('be.visible')

        //sign up without information
        signupPageEdu.signupButton.click()
        signupPageEdu.signupButton.should('be.disabled')
        cy.textVisible('Please enter your first name.');
        cy.textVisible('Please enter your last name.');
        cy.textVisible('Please enter your email address.');
        cy.textVisible('Please enter your password.');

        //global variable
        for (var index in this.invalidCredentials_Signup) {
            signupPageEdu.firstNameInput.clear().type(this.invalidCredentials_Signup[index].firstName)
            signupPageEdu.lastNameInput.clear().type(this.invalidCredentials_Signup[index].lastName)
            signupPageEdu.passwordInput.clear().type(this.invalidCredentials_Signup[index].password)
            signupPageEdu.emailInput.clear().type(this.invalidCredentials_Signup[index].email)
            signupPageEdu.signupButton.should('be.enabled')
            signupPageEdu.signupButton.click()
            signupPageEdu.messageContent.should('contain.text', this.invalidCredentials_Signup[index].errorMessage1);
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
        signupPageEdu.signupButton.should('be.visible')

        //generate fake data and write to dataFake.json
        cy.generateFakeData()

        //get data from dataFake.json
        cy.fixture('dataFake').then(function (dataFake) {
            //get data from dataFake.json
            //sign up with valid email
            const email = 'edu+' + dataFake.randTime + '@gotitapp.co';
            const password = `Aa123456@`;
            const firstName = dataFake.randTime

            signupPageEdu.firstNameInput.clear().type(firstName)
            signupPageEdu.lastNameInput.clear().type('edu')
            signupPageEdu.passwordInput.clear().type(password)
            signupPageEdu.emailInput.clear().type(email)
            signupPageEdu.signupButton.should('be.enabled')
            signupPageEdu.signupButton.click()

            //save account after successful registration in realEduAccount.json
            cy.writeDataToFile('cypress/fixtures/realEduAccount.json', email, password, firstName)

            //Verify Educator register successfully and is redirected to Home Page
            homePageEdu.greatingMessage.should('contain.text', 'Welcome, ' + dataFake.randTime + '!');
            homePageEdu.instructorSummary.should('contain.text', 'Manage your courses and students, all in one place!');
            // homePageEdu.createCourseSummary.should('contain.text', 'Begin your teaching journey with MathGPT by creating your first course today!');

        })


    })

})