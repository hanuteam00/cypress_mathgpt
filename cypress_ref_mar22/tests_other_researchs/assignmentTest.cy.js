import LoginPageUI from '../../pageUIs/LoginPageUI';
import HomePageUI from '../../pageUIs/HomePageUI';
import NewBotPage from '../../pageUIs/NewBotPage';
import ChatPageUI from '../../pageUIs/ChatPageUI';
// import { it } from '@faker-js/faker';

const loginPageUI = new LoginPageUI();
const homePageUI = new HomePageUI();
const newBotPage = new NewBotPage();
const chatPageUI = new ChatPageUI();

describe('Test Suite 1', function () {
    beforeEach(function () {
        cy.fixture('data').then(function (data) {
            this.data = data;
            cy.loginByPredefinedAccessToken_expMathGPTUrl(data.access_token_new_educator)
        })
    })
    it('TC1 - create assignment sucessfully', function () {
        cy.visit(this.data.mathgptEXPUrl);

        //record

        /* ==== Generated with Cypress Studio ==== */
        //Left Menu
        cy.contains('Dashboard');
        cy.contains('Student List');
        cy.contains('Assignments');

        /*
        cy.contains('Get an overview of your assignments\' statistics or create a new assignment.');
        cy.contains('GENERATE ASSIGNMENT');
        cy.xpath(`//button[normalize-space()='GENERATE ASSIGNMENT']`).should('be.visible');
        cy.xpath(`//button[normalize-space()='GENERATE ASSIGNMENT']`).should('be.enabled');
        cy.contains('GENERATE ASSIGNMENT').click();

        //css selector for the first cursorPointer
        // cy.get('div[class^="u-cursorPointer"]').first().click();
        
        
        //Step 1/4
        cy.contains(`Step 1/4: Choose learning objective(s).`).should('be.visible');
        cy.contains('AI generated').should('be.visible');
        cy.contains(`Notice: Changes are automatically saved`).should('be.visible');

        cy.contains('CANCEL').should('be.enabled');
        cy.contains('NEXT STEP').should('be.disabled');
        
        //expand the firt Unit
        cy.xpath(`(//div[starts-with(@class,'u-cursorPointer')])[1]`).click();
        
        //select the first LO (which having content/concepts...)
        // cy.xpath(`(//div[starts-with(@class,'LOSelectionListItem u-widthFull')])[1]/div`).click()
        cy.contains(`Classifying a Real Number`).click()

        //click on Next button
        cy.contains('NEXT STEP').should('be.enabled');
        cy.contains('NEXT STEP').click();

        //Step 2/4
        cy.contains(`Step 2/4: Configure your question types and points distribution.`).should('be.visible');
        cy.contains('AI generated').should('be.visible');
        cy.contains(`Notice: Changes are automatically saved`).should('be.visible');

        //Expand and select random Unit
        // cy.randUnitExpand(`//div[starts-with(@class,'u-cursorPointer')]`)

        //select random LOs in selected Unit
        // cy.randLOinUnitSelected(`div[class^="LOSelectionListItem u-widthFull"] > div`)
        
        //set value from 1 to 0
        cy.xpath(`(//*[text()='Multiple choice question(s)']/following-sibling::div)[1]/input`).clear()
        cy.xpath(`(//*[text()='Multiple choice question(s)']/following-sibling::div)[1]/input`).type('0')

        cy.xpath(`(//*[text()='Multiple select question(s)']/following-sibling::div)[1]/input`).clear()
        cy.xpath(`(//*[text()='Multiple select question(s)']/following-sibling::div)[1]/input`).type('0')

        cy.xpath(`(//*[text()='Yes/No question(s)']/following-sibling::div)[1]/input`).clear()
        cy.xpath(`(//*[text()='Yes/No question(s)']/following-sibling::div)[1]/input`).type('0')

        // cy.xpath(`(//*[text()='Fill in the blank(s)']/following-sibling::div)[1]/input`).clear()
        // cy.xpath(`(//*[text()='Fill in the blank(s)']/following-sibling::div)[1]/input`).type('0')

        cy.xpath(`(//*[text()='Total']/following-sibling::div)[1]`).should('have.text','1')

        cy.contains('PREVIOUS STEP').should('be.visible');
        cy.contains('GENERATE QUESTIONS', {matchCase: false}).should('be.visible');
        cy.contains('GENERATE QUESTIONS', {matchCase: false}).click();

        //Generating questions...
        cy.contains(`Generating questions...`, {matchCase: false}).should('be.visible');
        // cy.contains(`BACK TO ASSIGNMENT LIST`).should('be.visible');
        cy.contains(`Assignment" was created successfully.`, {matchCase: false}).should('be.visible');


        //Step 3/4
        cy.contains(`Step 3/4: Review and make changes to your questions if needed.`).should('be.visible');
        // cy.contains('AI generated').should('be.visible');
        cy.contains(`Notice: Changes are automatically saved`).should('be.visible');
        cy.contains(`NEXT STEP`, {matchCase: false}).should('be.visible');
        cy.contains(`NEXT STEP`, {matchCase: false}).click();

        
        //Step 4/4
        cy.contains(`Step 4/4: Configure your assignment settings before publishing the assignment.`).should('be.visible');
        // cy.contains('AI generated').should('be.visible');
        cy.contains(`Notice: Changes are automatically saved`).should('be.visible');
        cy.contains(`PREVIOUS STEP`, {matchCase: false}).should('be.visible');
        cy.contains(`SAVE FOR LATER`, {matchCase: false}).should('be.visible');
        cy.contains(`PUBLISH ASSIGNMENT`, {matchCase: false}).should('be.visible');
        
        */
        //With pre-defined assignment

        //Change Available date time
        // cy.xpath(`(//div[starts-with(@data-testid,'date-picker__availableDate__input')]/div)[1]`).invoke('attr','value','11/17/2023')
        cy.contains(`[v1.3.6] no mathGPT with score`).click()
        cy.contains(`NEXT STEP`, {matchCase: false}).click();

        cy.xpath(`(//div[@data-testid='date-picker__availableDate__input']/div)[1]`).then(a =>{
            cy.log(a.text())
        })
        // cy.wait(1000)
        //cy.get(`div[data-testid='date-picker__availableDate__input']>div`).eq(1)
        //.should('have.text', '11/10/2023')
        //.invoke('val').should('eq', '11/10/2023') // Invoke the 'val' function

        // cy.xpath(`(//div[@data-testid='date-picker__availableDate__input']/div)[1]`).should('have.text', '11/10/2023') -> work
        cy.xpath(`(//div[@data-testid='date-picker__availableDate__input']/div)[1]`)
        .invoke('text','11/17/2023')
        cy.xpath(`//input[@data-testid='time-picker__availableTime__input']`).clear().type('00:01 AM').tab()
        // .invoke('text').should('eq', '11/10/2023')
        //.type('11/17/2023')
        //.invoke('val').should('eq', '11/10/2023') // Invoke the 'val' function

        // .invoke('val').should('eq','11/17/2023')
        // .invoke('attr','value','11/17/2023')
        // .clear().type('11/17/2023')
        // .type('11/17/2023')
        cy.wait(1000)
        
        cy.xpath(`(//div[@data-testid='date-picker__dueDate__input']/div)[1]`)
        .invoke('text','11/24/2023')
        cy.xpath(`//input[@data-testid='time-picker__dueTime__input']`).clear().type('11:59 PM').tab()
        cy.wait(1000)
        // cy.xpath(`(//div[@data-testid='date-picker__dueDate__inputs']/div)[1]`).type('11/24/2023')

        // .invoke('attr','value','11:30 PM')
        
        // cy.contains(`PUBLISH ASSIGNMENT`).click();

        // cy.reload()
        // cy.get('.u-paddingBottomSmall > .u-alignItemsStart > .u-text200').should('be.visible');
        // cy.get('.u-textGray').should('be.visible');
        // cy.get(':nth-child(1) > :nth-child(2) > .LOSelectionListItem > .u-heightFull > .u-inlineBlock').click();
        // cy.get(':nth-child(2) > [style="width: fit-content;"] > .FormCheck > .FormCheck-label').click();
        // cy.get('#\\39 9').check();
        // cy.get(':nth-child(2) > .u-flex > .u-backgroundPrimary').should('be.enabled');
        // cy.get(':nth-child(2) > .u-flex > .u-textDark').should('be.enabled');
        // cy.get(':nth-child(2) > .u-flex > .u-backgroundPrimary').click();
        // cy.get('.u-paddingBottomSmall > .u-alignItemsStart > .u-text200').should('be.visible');
        // cy.get('[style="padding: 12px; text-align: end; width: 20%; min-width: 360px;"]').should('be.visible');
        // cy.get('[style="padding: 12px; width: 10%; min-width: 176px;"]').should('be.visible');
        
        // cy.get(':nth-child(1) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').clear('0');
        // cy.get(':nth-child(1) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').type('0');
        
        // cy.get(':nth-child(3) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').clear('0');
        // cy.get(':nth-child(3) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').type('0');
        
        // cy.get(':nth-child(4) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').clear('0');
        // cy.get(':nth-child(4) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').type('0');

        // cy.get(':nth-child(2) > .u-flex > .u-textDark').should('be.enabled');
        // cy.get('.u-backgroundPrimary > div').should('be.visible');
        // cy.get('.u-backgroundPrimary > div').click();
        // cy.get('[data-testid="modal-primary-button"]').should('be.visible');
        // cy.get('[data-testid="modal-primary-button"]').should('be.enabled');
        // cy.get('.Modal-header').should('be.visible');
        // cy.get('.Modal-body').click();
        // cy.get('.Modal-header').click();
        // cy.get('[data-testid="creating-assignment-modal"]').click();
        // cy.get('.__cypress-selector-playground').should('be.visible');
        // cy.get(':nth-child(2) > .u-flex > .Button').should('be.visible');
        // cy.get(':nth-child(2) > .u-flex > .Button').should('be.enabled');
        // cy.get('.u-paddingBottomSmall > .u-alignItemsStart > .u-text200').should('be.visible');
        /* ==== End Cypress Studio ==== */
    });

//     it('TC2 - send some messages sucessfully', function () {
//         cy.visit(this.data.testingBotUrl);

//         chatPageUI.writeMessage.type("Thanks");
//         chatPageUI.sendMessage.click();
//         chatPageUI.truthCheckerResult.should('be.visible');
//         chatPageUI.showRelatedContentButton.click();
//         chatPageUI.articleItem.should('have.length.above', 0);

//         chatPageUI.writeMessage.type("Hello");
//         chatPageUI.sendMessage.click();
//         chatPageUI.showRelatedContentButton.last().click();
//         chatPageUI.articleItem.last().click();
//         cy.contains('There are no relevant articles.').should('be.exist')

//     })

//     it('TC3 - typeRead - local variable', function () {
//         cy.readFile('cypress/fixtures/typeRead.json').then(Shinobi => {
//             for (var index in Shinobi) {
//                 cy.visit(this.data.testingBotUrl);
//                 cy.get(`[data-testid="composer"]`).clear().type(Shinobi[index].name)
//                 cy.get(`[data-testid="send-message-button"]`).click()
//                 cy.get(`[data-testid="send-message-loading-icon"]`).should('be.visible')
//             }
//         })
//     })

//     it('TC4 - typeRead - global variable in beforeEach', function () {
//         for (var index in this.type) {
//             cy.visit(this.data.testingBotUrl);
//             cy.get(`[data-testid="composer"]`).type(this.type[index].name)
//             cy.get(`[data-testid="send-message-button"]`).click()
//             cy.get(`[data-testid="send-message-loading-icon"]`).should('be.visible')
//         }
//     })
// })

// describe.skip('Wait Suite', function () {
//     beforeEach(function () {
//         cy.fixture('data').then(function (data) {
//             this.data = data;
//             cy.loginByAPI(data.loginAPIUrl, data.whitelisted_email, data.whitelisted_password)
//         })
//         cy.fixture('type').then((type) => {
//             this.type = type
//         })
//     })

//     it.skip('TC5 - Verify Contact Button successfully', function () {
//         /* ==== Generated with Cypress Studio ==== */
//         // cy.visit(this.data.abc);
//         cy.get().click();
//         cy.get('.u-marginTopSmall > .FormInput').clear('m');
//         cy.get('.u-marginTopSmall > .FormInput').type('manh');
//         cy.get(':nth-child(2) > .FormInput').clear('m');
//         cy.get(':nth-child(2) > .FormInput').type('manhtt@topcv.vn');
//         cy.get(':nth-child(2) > .FormInput').click();
//         cy.get(':nth-child(3) > .FormInput').click();
//         cy.get('.CustomButton').click();
//         cy.get('[fill="#D1FADF"]').should('be.visible');
//         cy.get('.Modal-header > .u-backgroundWhite').click();
//         cy.get('.Modal-header > .u-backgroundWhite').click();
//         cy.get('.Modal-header > .u-backgroundWhite').click();
//         cy.get('.Modal-header > .u-backgroundWhite').should('be.visible');
//         cy.get('.Modal-body > .u-roundedMedium').click();
//         cy.get('.Modal-body > .u-roundedMedium').click();
//         cy.get('.Modal-body > .u-roundedMedium').click();
//         cy.get('.Modal-body > .u-roundedMedium').should('be.visible');
//         cy.get('.Modal-body > .u-roundedMedium').click();
//         cy.get('[data-testid="close-button-icon"]').click();
//         /* ==== End Cypress Studio ==== */
//     })

//     it.skip('TC6 - restart conversation 20 times', function () {
//         cy.visit(this.data.testingBotUrl_ArticleBotStaging);

//         startOverAndOver(this.data.maxNumberToStartOver)
//     });
//     //step 5: write test cases, starting with it
//     it.skip('TC7 - login successfully', function () {
//         //5: check visible element Go to bot
//         cy.visit(this.data.homeBotUrl);
//         homePageUI.homePageTitle.should('be.visible')
//         homePageUI.goToBot.should('be.visible')

//     });

//     it.skip('TC8 - Stop Generation', function () {
//         cy.visit(this.data.testingBotUrl_ArticleBotStaging);

//         //send first message
//         chatPageUI.writeMessage.type("Thanks");
//         cy.get(`[data-testid="send-message-button"] > svg`).click()
//         // cy.get(`.u-flex.u-flexColumn.u-flexGapLarge`).last().should('be.visible')
//         cy.get(`div[class='u-flex u-flexColumn u-flexGapLarge'] div[class='u-flex u-justifyContentBetween u-alignItemsCenter']`).last().should('exist')
//         // cy.get(`[data-testid="truth-checker-component"] > svg`).should('exist')
//         cy.get(`[data-testid="stop-responding-button"]`).click()

//     })

//     it.skip('TC9 - Wait TC', function () {
//         cy.visit(this.data.testingBotUrl_ArticleBotStaging);

//         chatPageUI.writeMessage.type("Thanks");

//         //wait for bottom Logo appears to make sure the page is loaded completely
//         // cy.get(`img[alt='Powered by Got It, Inc.']`).should('be.visible')

//         //start writing TC here

//         //wait for invisible state of start-over button to be disappear
//         // cy.get(`.u-cursorDefault`).should('not.exist')

//         // //wait for visible state of start-over button to be appear and click on it
//         // cy.get(`div[data-name='start-over']`).click()

//         // //wait for Confirmation modal appears
//         // cy.get(`.u-shadowMedium`).should('be.visible')

//         // //click on Confirm to start-over button
//         // cy.get(`.CustomButton`).first().click()

//     });

//     it.skip('TC10 - edit bot', function () {
//         cy.visit(`https://articlebot.got-it.ai/bots/gotitapphelp-zendesk-com-categories-18439470575385-refund-my-money-648/edit`);

//     })

//     it.skip('TC11 - type', function () {
//         for (var index in this.type) {
//             cy.visit(`https://articlebot.got-it.ai/bots/gotitapphelp-zendesk-com-categories-18439470575385-refund-my-money-648`);
//             cy.get(`[data-testid="composer"]`).type(this.type[index].name)
//             cy.get(`[data-testid="send-message-button"]`).click()
//             cy.get(`[data-testid="send-message-loading-icon"]`).should('be.visible')
//         }
//     })
})