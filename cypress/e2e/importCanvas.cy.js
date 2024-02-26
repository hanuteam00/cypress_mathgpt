describe('template spec', () => {
  beforeEach(() => {
    cy.loginByAPIgetRefreshToken('https://mathgpt-api-dev.tutoruniverse.net/token-refreshes', `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NjQiLCJleHAiOjE3MDk1NTAyMjcsImp0aSI6ImI3MTgwMDg0ZDQ5NjExZWViN2U1YmVhOTQ1MTBkNzQ1IiwiaXNzIjoiZ290LWl0LmFpL3Bob3Rvc3R1ZHkifQ.bechdNejJbc9_EpVjJq6UoGxRVxXL-zeruh6wtsBoy13ICCZwyuhMdMNaB8RXbW0HWYtIveDMDvTz8xfpNUMAwzow_RKDRG41O4IyZcW2r9XzvBIX_Vh16Ztra72iz9_rMTYTSKT9Qzs5srr7-d71bJ6W70YG8EhJ5dt3xMVSsrroj5cVKcB0bJag-CXHDTmUqdV5NRwSJHNDMJHA02wHabYUGKVLd2OYvVY6sErFmM2mUlSEt-ozpfKBqpp_dsV0BkQ-pIRNB0i42hGinX2gBefK3HaLPGyahRm0hiOgaeyXJmGZPmIJYi9vCGcjZ0sGguFnrP1wA_RBjC0RFx09w`)
  })

  it('importCanvas1', function () {
    /* ==== Generated with Cypress Studio ====
    cy.visit('https://dev.mathgpt.ai/login?role=educator');
    cy.get(':nth-child(1) > .FormInput').clear().type('manh+edu1@gotitapp.co');
    cy.get('.FormInputWrapper-sc-8v1liz-1 > .FormInput').clear().type('Aa123456@');
    cy.get('.u-backgroundPrimary').click();
    */

    cy.visit('https://dev.mathgpt.ai/home')
    //click on Create button
    cy.contains('Create new course').click({ force: true })
    cy.contains('Import from Canvas').click({ force: true })
    // cy.get('.u-marginBottomMedium > .u-flex > .Button > .Button-label').click();
    // cy.get('.u-gapSmall > :nth-child(1)').click();
    
    //click on "demo1" course
    // cy.get(':nth-child(4) > .u-zIndex2 > .u-flexGrow1 > .u-justifyContentBetween > .Button > .u-fontSemiBold').click();
    //selector "Import the course" list: [class^=CourseItemContentWrapper] + div > button
    // cy.get('[class^=CourseItemContentWrapper] > div:first-child').each(($element) => {
    //   const text = $element.text().trim();
    //   if (text.includes('demo1')) {
    //     // Find the button in the sibling div
    //     cy.get($element).siblings('div').find('button').click();
    //   }
    // });

    /*
    cy.get('[class^=CourseItemContentWrapper] > div:first-child').each(($element) => {
      const text = $element.text().trim();
      if (text.includes('demo1')) {
        // Find the sibling div and then find the button within it
        cy.get('[class^=CourseItemContentWrapper]').siblings('div').find('button').click();
      }
    });
    */
    cy.get('[class^=CourseItemWrapper]').each(($parentElement) => {
      // Check if the specific CSS selector contains 'demo1' text
      if ($parentElement.find('> div:last-child > div > div:first-child > div:first-child').text().includes('demo1')) {
        // Click on the button within the specific CSS selector
        $parentElement.find('> div:last-child > div > div:last-child > button').click();
      }
    });

    cy.get('#react-select-2-placeholder').click();
    cy.get('#react-select-2-option-2').click();
    // cy.get('[data-testid="date-picker__startDate__input"] > .u-flexGrow1').click();
    // cy.get('.react-calendar__month-view__days > :nth-child(33)').click();
    // cy.get('[data-testid="date-picker__endDate__input"] > .u-flexGrow1').click();
    // cy.get('.react-calendar__navigation__next-button').click();
    // cy.get('.react-calendar__month-view__days > :nth-child(35)').click();
    
    //import student
    cy.get('.FormCheck').click();

    //select Algebra book
    cy.contains('College Algebra 2e').click()
    // cy.get(':nth-child(1) > .u-justifyContentCenter > .BookThumbnailWrapper-sc-r3zu6m-0 > .u-zIndex2 > .u-maxWidthFull').click();
    
    cy.contains('Create course').last().click()
    //cy.get('.u-backgroundPrimary').click();
    // cy.get('.u-marginLeftMedium > .ut-textGray900').click();
    // cy.get('.u-marginLeftMedium > .ut-textGray900').click();
    // cy.get('.u-marginLeftMedium > .ut-textGray900').click();
    cy.contains('Yay! Your course has been created.')
    cy.contains('This course has been imported from Canvas.')
    cy.contains('Last updated from Canvas:')
    // cy.get('.u-marginLeftMedium > .ut-textGray900').should('have.text', 'Yay! Your course has been created.');
    // cy.get('.u-marginLeftMedium > .ut-textGray900').should('have.text', 'Yay! Your course has been created.');
    // cy.get('.u-flexGrow1 > :nth-child(1) > .u-marginBottomExtraSmall').should('have.text', 'This course has been imported from Canvas. You\'re unable to add, edit, or remove contents here. Please access Canvas to make any modifications to the course.');
    // cy.get(':nth-child(4) > .u-flex > .u-flexGrow1 > .u-textWordBreak > .ReactMarkdownContainer-sc-uxrz4f-0 > .markdown-content > p').click();
    // cy.get('[data-testid="heading"] > :nth-child(1)').click();
    cy.contains('Students').click()
    cy.contains('Student name')
    // cy.get('[data-testid="heading"] > :nth-child(1)').click();
    // cy.get('[data-testid="heading"] > :nth-child(1)').click();
    // cy.get('[data-testid="heading"] > :nth-child(1)').should('have.text', 'Student name');
    // cy.get(':nth-child(2) > .u-flex > .u-flexGrow1 > .u-textWordBreak > .ReactMarkdownContainer-sc-uxrz4f-0 > .markdown-content > p').click();
    // cy.get(':nth-child(1) > .u-flex > .u-flexGrow1 > .u-textWordBreak > .ReactMarkdownContainer-sc-uxrz4f-0 > .markdown-content > p').click();
    /* ==== End Cypress Studio ==== */
  })

})