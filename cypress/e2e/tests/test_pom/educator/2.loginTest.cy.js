import loginPageEduUI from '../../../pageUIs/MathGPT/Educator/loginPageEduUI'
import HomePageUI from '../../../pageUIs/MathGPT/Educator/HomePageUI'

const loginPageEdu = new loginPageEduUI();
const homePageEdu = new HomePageUI();

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

    it('TC1: Login unsuccessfuly', function () {
        cy.visit('/login?role=educator');

        //Verify that current page is 'Instructor login' page
        cy.textVisible('Instructor login');
        cy.textVisible('Email');
        cy.textVisible('Password');
        cy.textVisible('Forgot password?');
        cy.textVisible('Show');
        cy.textVisible('Log in');
        cy.textVisible('Log in with Google');
        cy.textVisible(`Don't have an account?`);
        cy.textVisible('Sign up');
        loginPageEdu.loginButton.should('be.visible')

        //Let blank email and password and click on "Log in" button
        loginPageEdu.emailInput.focus().blur();
        loginPageEdu.passwordInput.focus().blur();
        loginPageEdu.loginButton.click({force: true});
        //verify error message
        loginPageEdu.emailError.should('contain.text', 'Please enter your email address.');
        loginPageEdu.passwordError.should('contain.text', 'Please enter your password.');

        //Input invalid email type
        loginPageEdu.emailInput.clear().type('edu');
        loginPageEdu.passwordInput.focus().blur();
        //verify error message
        loginPageEdu.emailError.should('contain.text', 'Please enter a valid email address.');
        loginPageEdu.passwordError.should('contain.text', 'Please enter your password.');

        //Input valid email, invalid password
        loginPageEdu.emailInput.clear().type('validEmail@gotitapp.co');
        loginPageEdu.passwordInput.clear().type('123456');
        loginPageEdu.loginButton.click();
        //verify error message
        loginPageEdu.emailError.should('not.exist');
        loginPageEdu.passwordError.should('not.exist');
        loginPageEdu.messageContent.should('contain.text', 'Invalid email or password. Please try again!')

        //Input valid email, invalid password
        loginPageEdu.emailInput.clear().type('manh+edu1@gotitapp.co');
        loginPageEdu.passwordInput.clear().type('123456');
        loginPageEdu.loginButton.click();
        //verify error message
        loginPageEdu.emailError.should('not.exist');
        loginPageEdu.passwordError.should('not.exist');
        loginPageEdu.messageContent.should('contain.text', 'Invalid email or password. Please try again!')

        //Input valid email, invalid password
        loginPageEdu.emailInput.clear().type('manh+edu1@gotitapp.co');
        loginPageEdu.passwordInput.clear().type('123456');
        loginPageEdu.loginButton.click();
        //verify error message
        loginPageEdu.emailError.should('not.exist');
        loginPageEdu.passwordError.should('not.exist');
        loginPageEdu.messageContent.should('contain.text', 'Invalid email or password. Please try again!')
        
    })
    it('TC2: Login successfuly', function () {
        cy.visit('/login?role=educator');

        //Verify that current page is 'Instructor login' page
        cy.textVisible('Instructor login');
        cy.textVisible('Email');
        cy.textVisible('Password');
        cy.textVisible('Forgot password?');
        cy.textVisible('Show');
        cy.textVisible('Log in');
        cy.textVisible('Log in with Google');
        cy.textVisible(`Don't have an account?`);
        cy.textVisible('Sign up');
        loginPageEdu.loginButton.should('be.visible')

        //Input valid email, valid password
        loginPageEdu.emailInput.clear().type(this.realEduAccount[0].email);
        loginPageEdu.passwordInput.clear().type(this.realEduAccount[0].password);
        loginPageEdu.loginButton.click();

        //Verify Educator login successfully and is redirected to Home Page
        homePageEdu.greatingMessage.should('contain.text', 'Welcome, ' + this.realEduAccount[0].firstName);
        homePageEdu.instructorSummary.should('contain.text', 'Manage your courses and students, all in one place!');

    })

})