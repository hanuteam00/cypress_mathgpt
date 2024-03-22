import SignupPageUI from '../../../pageUIs/MathGPT/Educator/SignupPageUI'
import HomePageUI from '../../../pageUIs/MathGPT/Educator/HomePageUI'

const signupPage = new SignupPageUI();
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

        cy.fixture('invalidLogin').then(function (invalidLogin) {
            //get data from invalidLogin.json
            this.invalidLogin = invalidLogin;
        })

    })

    it.only('TC1: Sign up as Educator role', function () {
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
        for (var index in this.invalidLogin) {
            signupPage.firstNameInput.clear().type(this.invalidLogin[index].firstName)
            signupPage.lastNameInput.clear().type(this.invalidLogin[index].lastName)
            signupPage.passwordInput.clear().type(this.invalidLogin[index].password)
            signupPage.emailInput.clear().type(this.invalidLogin[index].email)
            signupPage.signupButton.should('be.enabled')
            signupPage.signupButton.click()
            signupPage.messageContent.should('contain.text', this.invalidLogin[index].errorMessage1);
        }

        /*

        //sign up with existing email
        signupPage.firstNameInput.clear().type('existingAccount')
        signupPage.lastNameInput.clear().type('gotit')
        signupPage.passwordInput.clear().type('Aa123456@')
        signupPage.emailInput.clear().type('gotit+existingAccount@gotitapp.co')
        signupPage.signupButton.should('be.enabled')
        signupPage.signupButton.click()
        signupPage.messageContent.should('contain.text', 'The account already exists. Please log in to continue.');

        //sign up with invalid domain
        signupPage.firstNameInput.clear().type('invalidDomain')
        signupPage.lastNameInput.clear().type('gotit')
        signupPage.passwordInput.clear().type('Aa123456@')
        signupPage.emailInput.clear().type('gotit+invalidDomain@gmail.com')
        signupPage.signupButton.should('be.enabled')
        signupPage.signupButton.click()
        signupPage.messageContent.should('contain.text', 'Access to MathGPT is currently not enabled for your account. Please reach out to the Got It admin for assistance.');

        */

        //sign up with valid email
        const email = 'edu+' + this.dataFake.randTime + '@gotitapp.co';
        const password = `Aa123456@`;

        signupPage.firstNameInput.clear().type(this.dataFake.randTime)
        signupPage.lastNameInput.clear().type('edu')
        signupPage.passwordInput.clear().type(password)
        signupPage.emailInput.clear().type(email)
        signupPage.signupButton.should('be.enabled')
        signupPage.signupButton.click()

        //save account after successful registration in realEduAccount.json
        cy.writeDataToFile('cypress/fixtures/realEduAccount.json', email, password)

        //Verify Educator register successfully and is redirected to Home Page
        homePageEdu.greatingMessage.should('contain.text', 'Welcome, ' + this.dataFake.randTime + '!');
        homePageEdu.instructorSummary.should('contain.text', 'Manage your courses and students, all in one place!');
        homePageEdu.createCourseSummary.should('contain.text', 'Begin your teaching journey with MathGPT by creating your first course today!');


    })

    it.only('TC1: Sign up as Student role', function () {
        // Visit MathGPT DEV;
        cy.visit('/signup?role=student');

        //Verify that current page is 'Create an Instructor account' page
        cy.textVisible('Create a Student account');
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
        for (var index in this.invalidLogin) {
            signupPage.firstNameInput.clear().type(this.invalidLogin[index].firstName)
            signupPage.lastNameInput.clear().type(this.invalidLogin[index].lastName)
            signupPage.passwordInput.clear().type(this.invalidLogin[index].password)
            signupPage.emailInput.clear().type(this.invalidLogin[index].email)
            signupPage.signupButton.should('be.enabled')
            signupPage.signupButton.click()
            signupPage.messageContent.should('contain.text', this.invalidLogin[index].errorMessage2);
        }

        /*

        //sign up with existing email
        signupPage.firstNameInput.clear().type('existingAccount')
        signupPage.lastNameInput.clear().type('gotit')
        signupPage.passwordInput.clear().type('Aa123456@')
        signupPage.emailInput.clear().type('gotit+existingAccount@gotitapp.co')
        signupPage.signupButton.should('be.enabled')
        signupPage.signupButton.click()
        signupPage.messageContent.should('contain.text', 'The account already exists. Please log in to continue.');

        //sign up with invalid domain
        signupPage.firstNameInput.clear().type('invalidDomain')
        signupPage.lastNameInput.clear().type('gotit')
        signupPage.passwordInput.clear().type('Aa123456@')
        signupPage.emailInput.clear().type('gotit+invalidDomain@gmail.com')
        signupPage.signupButton.should('be.enabled')
        signupPage.signupButton.click()
        signupPage.messageContent.should('contain.text', 'Access to MathGPT is currently not enabled for your account. Please reach out to the Got It admin for assistance.');

        */

        //sign up with valid email
        const email = 'stu+' + this.dataFake.randTime + '@gotitapp.co';
        const password = `Aa123456@`;

        signupPage.firstNameInput.clear().type(this.dataFake.randTime)
        signupPage.lastNameInput.clear().type('stu')
        signupPage.passwordInput.clear().type(password)
        signupPage.emailInput.clear().type(email)
        signupPage.signupButton.should('be.enabled')
        signupPage.signupButton.click()

        //save account after successful registration in realEduAccount.json
        cy.writeDataToFile('cypress/fixtures/realStuAccount.json', email, password)

        //Verify Educator register successfully and is redirected to Home Page
        homePageEdu.greatingMessage.should('contain.text', 'Welcome, ' + this.dataFake.randTime + '!');

    })

    it.skip('TC1: v1.5.0 - Login UI with whitelisted email', function () {
        //1.At Main Page
        //verify title
        cy.title().should('include', "MathGPT.AI | An instructor's AI Teaching Assistant and their students' AI Tutor");

        //verify url
        loginPageUI.url.should('eq', 'https://dev.mathgpt.ai/');
        //have text "Contact Us"
        cy.containsTextVisible('Your AI Teaching Assistant, Your Students’ AI Tutor');
        //have text "Contact Us"
        cy.containsTextVisible('Contact Us');
        //have text "Log In"
        cy.containsTextVisible('Log In');

        //way 1: click on "Log In" button using properties
        // loginPageUI.loginButton1().click();

        //way 2: click on "Log In" button using getter function
        loginPageUI.loginButtonMain.click();

        //have text "Log in as an Instructor"
        loginPageUI.loginInstructor.should('contain.text', 'Log in as an Instructor');
        //have text "Log in as a Student"
        loginPageUI.loginStudent.should('contain.text', 'Log in as a Student');
        //click on "Log in as an Instructor"
        loginPageUI.loginInstructor.click();

        //2.At Login as an Instructor Page
        //verify title
        cy.title().should('include', "MathGPT.AI | An instructor's AI Teaching Assistant and their students' AI Tutor");
        //verify url
        loginPageUI.url.should('eq', 'https://dev.mathgpt.ai/login?role=educator');

        //verify text at Login Form
        cy.containsTextVisible('Log in as an Instructor');
        cy.containsTextVisible('Email');
        cy.get(`input[placeholder='Enter your email']`).should('be.visible');
        cy.containsTextVisible('Password');
        cy.get(`input[placeholder='Enter your password']`).should('be.visible');
        cy.containsTextVisible('Forgot password?');
        cy.containsTextVisible('Show');
        cy.containsTextVisible('Log in');

        cy.containsTextVisible('Log in with Google');

        cy.containsTextVisible(`Don't have an account?`);
        cy.containsTextVisible('Sign up');

        //Let blank email and password
        //click on "Log in" button
        cy.get(`input[placeholder='Enter your email']`).clear().type('');
        cy.get(`input[placeholder='Enter your password']`).clear().type('');
        cy.get(`form[class='u-widthFull'] > button:last-child`).click();
        //verify error message
        cy.get(`div[class*='alignItemsStart']`).eq(0).should('contain.text', 'Please enter your email address.');
        cy.get(`div[class*='alignItemsStart']`).eq(1).should('contain.text', 'Please enter your password.');

        //Input wrong email type
        cy.get(`input[placeholder='Enter your email']`).clear().type('edu1');
        //verify error message
        cy.get(`div[class*='alignItemsStart']`).eq(0).should('contain.text', 'Please enter a valid email address.');

        //Input valid email, invalid password
        cy.get(`input[placeholder='Enter your email']`).clear().type('manh+edu1@mailnesia.com');
        cy.get(`input[placeholder='Enter your password']`).clear().type('123456');
        //Click on Log in button
        cy.get(`form[class='u-widthFull'] > button:last-child`).click();
        //verify error message
        cy.get(`.Message-content`).should('contain.text', 'Invalid credentials.');

        //Input invalid email, valid password
        cy.get(`input[placeholder='Enter your email']`).clear().type('manh+edu1@mailnesia.cooo');
        cy.get(`input[placeholder='Enter your password']`).clear().type('Aa123456@');
        //Click on Log in button
        cy.get(`form[class='u-widthFull'] > button:last-child`).click();
        //verify error message
        cy.get(`.Message-content`).should('contain.text', 'Invalid credentials.');

        //Input valid email, valid password
        cy.get(`input[placeholder='Enter your email']`).clear().type('manh+edu1@mailnesia.com');
        cy.get(`input[placeholder='Enter your password']`).clear().type('Aa123456@');
        //Click on Log in button
        cy.get(`form[class='u-widthFull'] > button:last-child`).click();

        //verify being redirected to Home page
        cy.containsTextVisible('Welcome!');
        cy.containsTextVisible('Instructor');
        cy.containsTextVisible('Manage your courses and students, all in one place!');
        //"Create new course" button is visible
        cy.get(`.u-flex.u-gapSmall >> span:last-child`).should('be.visible');
    })

    it.skip('TC2: Login UI with invalid email', function () {
        //local variable
        cy.readFile('cypress/fixtures/invalidEmail.json').then(invalidEmail => {
            for (var index in invalidEmail) {

                //input email
                loginPageUI.emailInput.clear().type(invalidEmail[index].email)
                //click on Continue button
                loginPageUI.continueButton.click();
                cy.containsTextVisible(invalidEmail[index].errorMessage1);
            }
        })
    })

    it.skip('TC3: Login UI with valid email but invalid login code', function () {
        loginPageUI.emailInput.clear().type('manh+edu3@gmail.com')
        loginPageUI.continueButton.click();
        for (var index in this.invalidEmail) {
            //input email
            loginPageUI.verifyCode.clear().type(this.invalidEmail[index].code)
            //click on Continue button
            loginPageUI.continueButton.click({ force: true });
            cy.containsTextVisible(this.invalidEmail[index].errorMessage2);
        }
    })

    it.skip('TC4: Login UI with valid email but blank login code', function () {
        loginPageUI.emailInput.clear().type('manh+edu3@gmail.com')
        loginPageUI.continueButton.click();
        loginPageUI.verifyCode.clear().type('123456')
        loginPageUI.continueButton.click();
        loginPageUI.verifyCode.clear();
        cy.containsTextVisible('Please enter a valid login code.');
        cy.containsTextVisible("Invalid or expired login code. Please try again!");
    })

})