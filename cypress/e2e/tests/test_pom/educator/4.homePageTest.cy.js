import HomePageUI from '../../../pageUIs/Educator/HomePageUI'

const homePageEdu = new HomePageUI();

describe('Test Suite 1', function () {

    beforeEach(function () {
        cy.fixture('data').then(function (data) {
            this.data = data;
        })
        //generate fake data and write to dataFake.json
        cy.generateFakeData()

        // cy.loginByAPIgetRefreshToken("https://mathgpt-api.tutoruniverse.com/token-refreshes","eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MTEiLCJleHAiOjE3MDY1NDAxMjYsImp0aSI6IjQ2YzU0M2IyYjkzNjExZWU5MTM3OGU3MzE1ZDk3MDc1IiwiaXNzIjoiZ290LWl0LmFpL3Bob3Rvc3R1ZHkifQ.I4fXqNkD3orFmmaQ6UuIDBjZgX0zG3UDcu9jhjwPLJ6tY3wX22_noXBSgwYFhtzMRCr0chxv78L4b7ApGfuwE6UG4AnSqnfS3ETWXwyNpGeVvAqE17moiWJs41_Z5NvvoTh-W5mlL_DrW9_wIDc8FduF5cajqMoM_8TVk9woGPMiunqd7Dw5aF4VPnfZh9vdaFc7CtsodLCfj2cM-ByV_28H3-OoivELbhB1rFTiqOGuH7ocIKjW2UKUrUuqHLhA_k97Hwz0v92uLUnkxwRZ4VsacIl24xdZxlNaSSzca-V6xwC6UfvWvc5LpbiGYv9aGTyDnuBuHawlLMXtUurzDA")
        cy.loginByAPIgetRefreshTokenFromUILogin('https://mathgpt-api-dev.tutoruniverse.net/login','https://mathgpt-api-dev.tutoruniverse.net/token-refreshes', 'manh+edu1@mailnesia.com','Aa123456@')
        // cy.loginByAPIgetRefreshToken("https://mathgpt-api-dev.tutoruniverse.net//token-refreshes", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NjQiLCJleHAiOjE3MDY0MDc1NzksImp0aSI6ImFhYTlmMTc0YjgwMTExZWViN2U1YmVhOTQ1MTBkNzQ1IiwiaXNzIjoiZ290LWl0LmFpL3Bob3Rvc3R1ZHkifQ.KYVeeZOzbRE0asPkvCIlViegsHchB4dURZ1EzlKpAWC5iPmo3jHIwYOjrm08y9oq6Eya6dUbtWv-_XeksLzThkaryoAaL18avivkUahF8FKKBxmbFIQYcJnl34BO2oXLJLrafeIOcIO0D9EnowK_jB2W0uYe4SsBCXPQfHxoABH3pod1OE5GF_XVxtsRKD24ado9QRx8iZf_VmdbUvuqHepvfWAJB4gTPoucajIp5IwxWEmZArSSbYtKwX4uuvqM5khpiCZ-_xztuVTEUxXQnN0GsEgU2YZKd26ScSHr-h0Hgr5sjhzpF2CxcFwGcLqqcCJGs7ntqbsJbYf-SK_c_A")

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

    it.only('[Homepage] Educator will see maximum 3 courses ordered by latest access time ', function () {
        cy.visit('/home');

        //Verify that current page is 'Instructor login' page
        cy.textVisible('Manage your courses and students, all in one place!');

        homePageEdu.courseList.should('have.length', 3)

        /*
        loginPage.loginButton.should('be.visible')

        //Let blank email and password and click on "Log in" button
        loginPage.emailInput.focus().blur();
        loginPage.passwordInput.focus().blur();
        loginPage.loginButton.click();
        //verify error message
        loginPage.emailError.should('contain.text', 'Please enter your email address.');
        loginPage.passwordError.should('contain.text', 'Please enter your password.');

        //Input invalid email type
        loginPage.emailInput.clear().type('edu');
        loginPage.passwordInput.focus().blur();
        //verify error message
        loginPage.emailError.should('contain.text', 'Please enter a valid email address.');
        loginPage.passwordError.should('contain.text', 'Please enter your password.');

        //Input valid email, invalid password
        loginPage.emailInput.clear().type('validEmail@gotitapp.co');
        loginPage.passwordInput.clear().type('123456');
        loginPage.loginButton.click();
        //verify error message
        loginPage.emailError.should('not.exist');
        loginPage.passwordError.should('not.exist');
        loginPage.messageContent.should('contain.text', 'Invalid email or password. Please try again!')

        //Input valid email, invalid password
        loginPage.emailInput.clear().type('manh+edu1@gotitapp.co');
        loginPage.passwordInput.clear().type('123456');
        loginPage.loginButton.click();
        //verify error message
        loginPage.emailError.should('not.exist');
        loginPage.passwordError.should('not.exist');
        loginPage.messageContent.should('contain.text', 'Invalid email or password. Please try again!')

        //Input valid email, invalid password
        loginPage.emailInput.clear().type('manh+edu1@gotitapp.co');
        loginPage.passwordInput.clear().type('123456');
        loginPage.loginButton.click();
        //verify error message
        loginPage.emailError.should('not.exist');
        loginPage.passwordError.should('not.exist');
        loginPage.messageContent.should('contain.text', 'Invalid email or password. Please try again!')
        */
    })
})