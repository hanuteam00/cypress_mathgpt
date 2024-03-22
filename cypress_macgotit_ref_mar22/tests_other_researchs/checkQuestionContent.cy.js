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



});

/* ==== Test Created with Cypress Studio ==== */
it('edu_createContent', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://dev.mathgpt.ai/');
    cy.get('.Dropdown > .Button').click();
    cy.get('.Dropdown-container > :nth-child(1)').click();
    cy.get(':nth-child(1) > .FormInput').clear('manh+edu1@mailnesia.com');
    cy.get(':nth-child(1) > .FormInput').type('manh+edu1@mailnesia.com');
    cy.get('.FormInputWrapper-sc-8v1liz-2 > .FormInput').clear('A');
    cy.get('.FormInputWrapper-sc-8v1liz-2 > .FormInput').type('Aa123456@');
    cy.get(`form[class='u-widthFull'] > button`).eq(1).click();
    cy.get('.u-justifyContentBetween > .Button').click();
    cy.get('.u-justifyContentBetween > .u-flex > .Button').click();
    cy.get('.FormInput').clear();
    cy.get('.FormInput').type('mod_checkContent_02Jan');
    cy.get('.u-textRight > .u-backgroundPrimary > .Button-label').click();
    cy.get('.EmptyModuleItemWrapper-sc-17jxwgi-0 > .u-flex').click();
    cy.get('.css-1di9eel').click();
    cy.get('#react-select-2-option-4').click();
    cy.get('#text-title').clear('quiz1c');
    cy.get('#text-title').type('quiz1c');
    cy.get('.u-textRight > .u-backgroundPrimary > .Button-label').click();
    cy.get('.item-enter-done > .module-item > .u-alignItemsStart > .u-marginLeftSmall > :nth-child(2) > :nth-child(1) > .u-gapExtraSmall > .u-flex > .u-text200').should('have.text', 'Draft');
    cy.get('.item-enter-done > .module-item > .u-alignItemsStart > .u-marginLeftSmall > .ut-textGray900').should('have.text', 'quiz1c');
    cy.get('[data-rbd-draggable-id="module-206"] > .u-paddingTopMedium > .u-marginLeftExtraSmall > .u-fontSemiBold').should('have.text', 'mod_checkContent_02Jan');
    cy.get('.item-enter-done > .module-item > .u-alignItemsStart > .u-marginLeftSmall > .ut-textGray900').click();
    cy.get('.css-1di9eel').click();
    cy.get('#react-select-3-option-4').click();
    cy.get('.u-justifyContentEnd > .Button').click();
    cy.get(':nth-child(1) > .ut-backgroundGray50 > .u-paddingHorizontalMedium').click();
    cy.get(':nth-child(2) > .ut-backgroundGray50 > .u-paddingHorizontalMedium > svg').click();
    cy.get(':nth-child(3) > :nth-child(2) > .LOSelectionListItem > .u-paddingTopSmall > svg').click();
    cy.get(':nth-child(3) > .ut-backgroundGray50 > .u-paddingHorizontalMedium > svg').click();
    cy.get(':nth-child(3) > .u-flex > .ut-textGray900').should('have.text', 'Chapter 3. Functions');
    cy.get('[data-testid="chapter-list"] > :nth-child(3) > .u-flex > .u-paddingHorizontalMedium > svg').should('be.visible');
    cy.get('[data-testid="chapter-list"] > :nth-child(3) > .u-flex > .u-paddingHorizontalMedium > svg').click();
    cy.get(':nth-child(3) > :nth-child(2) > .LOSelectionListItem > .u-paddingVerticalSmall > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').should('have.text', '3.1. Functions and Function Notation');
    cy.contains('3.1. Functions and Function Notation').click();
    cy.get(':nth-child(9) > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').should('have.text', 'Finding Function Values from a Graph');
    cy.get(':nth-child(9) > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').click();
    cy.get(':nth-child(5) > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').should('have.text', 'Finding Input and Output Values of a Function');
    cy.get(':nth-child(5) > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').click();
    cy.get(':nth-child(10) > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').should('have.text', 'Determining Whether a Function is One-to-One');
    cy.get(':nth-child(10) > [style="width: fit-content;"] > .FormCheck').click();
    cy.get(':nth-child(10) > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').click();
    cy.get(':nth-child(10) > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').click();
    cy.get(':nth-child(10) > [style="width: fit-content;"] > .FormCheck > .CustomLabel-sc-1x58om1-0').click();
    cy.get('.u-flexColumn > :nth-child(2) > .Button').click();
    cy.get(':nth-child(7) > [style="text-align: end; width: 20%; min-width: 360px;"]').click();
    cy.get(':nth-child(7) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').click();
    cy.get(':nth-child(7) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').clear('0');
    cy.get(':nth-child(7) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').type('3');
    cy.get(':nth-child(3) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').click();
    cy.get(':nth-child(3) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').clear('0');
    cy.get(':nth-child(3) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').type('13');
    cy.get(':nth-child(11) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').click();
    cy.get(':nth-child(11) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').click();
    cy.get(':nth-child(11) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').clear('0');
    cy.get(':nth-child(11) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').type('5');
    cy.get(':nth-child(11) > [style="width: 10%; min-width: 176px;"]').click();
    cy.get(':nth-child(9) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').click();
    cy.get(':nth-child(9) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').clear('0');
    cy.get(':nth-child(9) > [style="text-align: end; width: 20%; min-width: 360px;"] > .FormGroup > .u-inlineBlock > .FormInput').type('0');
    cy.get('.u-heightFull.u-flexColumn').click();
    cy.get(':nth-child(1) > td.u-text200').should('have.text', 'Finding Input and Output Values of a Function');
    cy.get(':nth-child(5) > td.u-text200').should('have.text', 'Finding Function Values from a Graph');
    cy.get(':nth-child(9) > td.u-text200').should('have.text', 'Determining Whether a Function is One-to-One');
    cy.get('.ActionButtonsWrapper-sc-19xrws9-1 > .u-backgroundPrimary').click();
    cy.get('.u-paddingTopMedium > .u-flexColumn > .u-gapExtraSmall > [data-testid="lo-item-title"]').should('have.text', 'Finding Function Values from a Graph');
    cy.get('.u-paddingTopMedium > .u-flexColumn > .u-gapExtraSmall > [data-testid="lo-item-info"]').should('have.text', '(3 questions, 3 points)');
    cy.get(':nth-child(3) > .u-flexColumn > .u-gapExtraSmall > [data-testid="lo-item-title"]').should('have.text', 'Finding Input and Output Values of a Function');
    cy.get(':nth-child(3) > .u-flexColumn > .u-gapExtraSmall > [data-testid="lo-item-info"]').should('have.text', '(13 questions, 13 points)');
    cy.get(':nth-child(4) > .u-flexColumn > .u-gapExtraSmall > [data-testid="lo-item-title"]').should('have.text', 'Determining Whether a Function is One-to-One');
    cy.get('#assignment-scrollable-area > .ContainerInnerWrapper-sc-1wtn5m7-1').click();
    cy.get(':nth-child(4) > .u-flexColumn > .u-gapExtraSmall > [data-testid="lo-item-info"]').should('have.text', '(5 questions, 5 points)');
    cy.get('.u-flexColumn > :nth-child(2) > .Button').click();
    cy.get('[data-testid="date-picker__availableDate__input"] > .u-flexGrow1').click();
    cy.get('.react-calendar__tile--now > abbr').click();
    cy.get('[data-testid="time-picker__availableTime__input"]').click();
    cy.get('[data-time="Immediately"]').click();
    cy.get('body').click();
    cy.get(':nth-child(13) > abbr').click();
    cy.get('[data-testid="date-picker__availableDate__input"] > .u-flexGrow1').click();
    cy.get('.u-flexColumn.u-gapSmall > :nth-child(6)').click();
    cy.get('[data-testid="time-picker__dueTime__icon"] > svg').click();
    cy.get('[data-time="12:00 AM"]').click();
    cy.get('.u-flexColumn > :nth-child(2) > .u-backgroundPrimary').click();
    cy.get('[data-testid="modal-secondary-button"]').click();
    cy.get('[data-testid="date-picker__availableDate__input"] > .u-flexGrow1').should('have.text', 'Jan 02, 2024');
    cy.get('[data-testid="date-picker__availableDate__input"] > .u-flexGrow1').click();
    cy.get('[data-testid="date-picker__availableDate__input"] > .u-flexGrow1').click();
    cy.get('[style="padding-bottom: 48px;"]').click();
    cy.get('.u-flexColumn > :nth-child(2) > .u-backgroundPrimary').click();
    cy.get('.Modal-header > .u-flex > .ut-textGray900').should('have.text', 'Finalize confirmation');
    cy.get('[data-testid="modal-primary-button"]').click();
    cy.get('.u-backgroundPrimary > .Button-label').click();
    /* ==== End Cypress Studio ==== */
});