import LoginPageUI from '../../../pageUIs/MathGPT/LoginPageUI'

const loginPageUI = new LoginPageUI();

describe('Test Suite 1', function () {
    
    beforeEach(function () {
        cy.fixture('invalidEmail').then(function (invalidEmail) {
            //get data from invalidEmail.json
            this.invalidEmail = invalidEmail;
        })
        // Visit MathGPT DEV;
        cy.visit('https://dev.mathgpt.ai/');

    })


    it.only('TC0: v1.5.0 - Login with access token and refresh token', function () {
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
        loginPageUI.loginInstructor.should('have.text', 'Log in as an Instructor');
        //have text "Log in as a Student"
        loginPageUI.loginStudent.should('have.text', 'Log in as a Student');
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
        cy.get(`div[class*='alignItemsStart']`).eq(0).should('have.text', 'Please enter your email address.');
        cy.get(`div[class*='alignItemsStart']`).eq(1).should('have.text', 'Please enter your password.');

        //Input wrong email type
        cy.get(`input[placeholder='Enter your email']`).clear().type('edu1');
        //verify error message
        cy.get(`div[class*='alignItemsStart']`).eq(0).should('have.text', 'Please enter a valid email address.');

        //Input valid email, invalid password
        cy.get(`input[placeholder='Enter your email']`).clear().type('manh+edu1@mailnesia.com');
        cy.get(`input[placeholder='Enter your password']`).clear().type('123456');
        //Click on Log in button
        cy.get(`form[class='u-widthFull'] > button:last-child`).click();
        //verify error message
        cy.get(`.Message-content`).should('have.text', 'Invalid credentials.');

        //Input invalid email, valid password
        cy.get(`input[placeholder='Enter your email']`).clear().type('manh+edu1@mailnesia.cooo');
        cy.get(`input[placeholder='Enter your password']`).clear().type('Aa123456@');
        //Click on Log in button
        cy.get(`form[class='u-widthFull'] > button:last-child`).click();
        //verify error message
        cy.get(`.Message-content`).should('have.text', 'Invalid credentials.');

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
        loginPageUI.loginInstructor.should('have.text', 'Log in as an Instructor');
        //have text "Log in as a Student"
        loginPageUI.loginStudent.should('have.text', 'Log in as a Student');
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
        cy.get(`div[class*='alignItemsStart']`).eq(0).should('have.text', 'Please enter your email address.');
        cy.get(`div[class*='alignItemsStart']`).eq(1).should('have.text', 'Please enter your password.');

        //Input wrong email type
        cy.get(`input[placeholder='Enter your email']`).clear().type('edu1');
        //verify error message
        cy.get(`div[class*='alignItemsStart']`).eq(0).should('have.text', 'Please enter a valid email address.');

        //Input valid email, invalid password
        cy.get(`input[placeholder='Enter your email']`).clear().type('manh+edu1@mailnesia.com');
        cy.get(`input[placeholder='Enter your password']`).clear().type('123456');
        //Click on Log in button
        cy.get(`form[class='u-widthFull'] > button:last-child`).click();
        //verify error message
        cy.get(`.Message-content`).should('have.text', 'Invalid credentials.');

        //Input invalid email, valid password
        cy.get(`input[placeholder='Enter your email']`).clear().type('manh+edu1@mailnesia.cooo');
        cy.get(`input[placeholder='Enter your password']`).clear().type('Aa123456@');
        //Click on Log in button
        cy.get(`form[class='u-widthFull'] > button:last-child`).click();
        //verify error message
        cy.get(`.Message-content`).should('have.text', 'Invalid credentials.');

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
        //global variable
        loginPageUI.continueButton.click();
            for (var index in this.invalidEmail) {
                //input email
                loginPageUI.verifyCode.clear().type(this.invalidEmail[index].code)
                //click on Continue button
                loginPageUI.continueButton.click({force: true});
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