import LoginPageUI from '../../../pageUIs/MathGPT/LoginPageUI'
import HomePageUI_Educator from '../../../pageUIs/MathGPT/HomePageUI_Educator'

const loginPageUI = new LoginPageUI();
const homePageUI_Educator = new HomePageUI_Educator();

describe('Test Suite 1', function () {
    beforeEach(function () {
        cy.fixture('data').then(function (data) {
            this.data = data;
            cy.loginByAccessToken(data.apiUrl, data.email, data.code, data.access_token_old_educator_manh_edu2_gmail_com)
            // cy.loginByAccessToken()
        })

        //generate fake data and write to dataFake.json
        cy.generateFakeData()

        //get data from dataFake.json
        cy.fixture('dataFake').then(function (dataFake) {
            //get data from dataFake.json
            this.dataFake = dataFake;
        })

    })
    it('verify Homepage elements of existing account', function () {
        cy.visit(this.data.url_exp);
        cy.containsTextVisible('Instructor');
        cy.containsTextVisible('Manage your courses and students, all in one place!');


        //Main navigation
        //verify 3 sidebar menu
        homePageUI_Educator.homeTopIcon.should('have.length', 3);
        homePageUI_Educator.homeIcon.should('be.visible');
        homePageUI_Educator.mycoursesIcon.should('be.visible');
        homePageUI_Educator.mybooksIcon.should('be.visible');

        //Help and Profile button
        homePageUI_Educator.homeBottomIcon.should('have.length', 2);
        homePageUI_Educator.helpIcon.should('be.visible');
        homePageUI_Educator.profileIcon.should('be.visible');

        //Create new course visible
        cy.containsTextVisible('My Courses');
        cy.containsTextVisible('View all');
        cy.containsTextVisible('Create new course');

        //Books details should be exist in DOM
        cy.get(`a[class*='u-marginTopSmall']`).should('exist')
        //scroll to the 8th element of page - View all book
        // cy.get(`[class*='u-flex u-interFontFamily u-gapExtraSmall']`).eq(7).scrollIntoView()
        cy.get(`[class*='u-flex u-interFontFamily u-gapExtraSmall'] > button`).scrollIntoView()

        //My Books
        cy.containsTextVisible('My Books');
        // cy.containsTextVisible('View all');

        //click a random book
        cy.randomClick(`a[class*='u-marginTopSmall']`)

    });

    it.only('create new Course successfully', function () {
        cy.visit(this.data.url_exp);
        cy.contains('Create new course').click();



        //verify required field error in Create New Course page
        cy.contains('Manually create').click();
        cy.containsTextVisible('Manually create');
        cy.containsTextVisible('Course name is required.');
        cy.containsTextVisible('Course code is required.');
        cy.containsTextVisible('Please select a subject.');
        cy.containsTextVisible('Start date is required.');
        cy.containsTextVisible('End date is required.');
        cy.containsTextVisible('Please select at least one textbook.');

        //input new Course data
        cy.get('#form\\.courseName').clear().type('auto' + this.dataFake.randTime);
        cy.get('#form\\.courseCode').clear().type('auto' + this.dataFake.randTime);

        cy.get(`#react-select-2-placeholder`).click();
        // cy.get('#form\\.courseSubject').select('3');

        //select Course subject
        // await playwrightDev.clickToElement(`#react-select-2-placeholder`);
        cy.contains('Contemporary Math').click();

        //select timezone = Hanoi
        cy.contains('(GMT-8:00) Pacific Time').click();
        // await page.getByText('(GMT-7:00) Mountain Time').click();
        cy.contains('(GMT+7:00) Bangkok, Hanoi, Jakarta').click();

        //select Start date
        cy.get(`div[data-testid='date-picker__startDate__icon']`).click();

        const dayjs = require('dayjs')
        //Get current date
        cy.log(dayjs().format('MMMM DD, YYYY'))  //Prints todays date 30/09/2021
        //select current date
        cy.get(`[aria-label='${dayjs().format('MMMM DD, YYYY')}`).click();
        //direct input date
        // cy.get(`[aria-label='December 25, 2023']`).click();

        //select End date
        cy.get(`div[data-testid='date-picker__endDate__input`).click();
        //Get current date
        cy.log((dayjs().add(7, 'day')).format('MMMM DD, YYYY'))  //Prints todays date 30/09/2021
        //select current date
        cy.get(`[aria-label='${(dayjs().add(1, 'day')).format('MMMM DD, YYYY')}`).click();

        //select first textbook
        cy.get(`div[class^='TextbookItemWrapper']:nth-child(1)`).click();

        cy.contains('Manually create').click();

        //verify success Course message
        cy.get(`div[class^='heading']`).should('be.visible');
        cy.containsTextVisible('Yay! Course created.');

        cy.get(`.description.u-marginTopExtraSmall`).should('be.visible');
        cy.containsTextVisible(`We've prepared a placeholder, or a temporary spot, for the Course Overview. This is where the main description of your course will be. Please fill in content that accurately reflects the goals and structure of your course.`)
    });




})