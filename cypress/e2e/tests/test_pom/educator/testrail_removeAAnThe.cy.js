describe('template spec', () => {

  it.only('add TC1', function () {
    cy.visit('https://gotit.testrail.net/');
    cy.get('[data-testid="loginIdName"]').clear();
    cy.get('[data-testid="loginIdName"]').type('manh@gotitapp.co');
    cy.get('[data-testid="loginPasswordFormDialog"]').type('SGFuMTIzZG8h');
    cy.wait(1000)
    cy.get('[data-testid="loginButtonPrimary"]').click();
    cy.wait(1000)
    cy.visit('https://gotit.testrail.net/index.php?/suites/view/350&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=17799');

    //click on add test case
    // cy.get('#inlineSectionActions-17799 > [data-testid="suiteAddCaseLink"]').click();
    cy.get('[data-testid="suiteAddCaseLink"]').last().click();

    
    cy.get('.inline > .form-control').type('TC1d');
    cy.get('[data-testid="iconButtonAccept"]').click();

    //click on the last TC title
    cy.get('[data-testid="sectionCaseTitle"]').last().click();

    //click on Edit Button
    cy.get('[data-testid="testCaseEditButton"]').click();

    //
    cy.get('#custom_preconds_display').type('precond1');

    cy.get('#custom_testdata_display').type('testdata1');

    //add step1
    cy.get('[data-testid="addEditCaseAddStep"]').last().click();

    //add step
    cy.get('[data-testid="addEditCaseStepContent"]').last().type('step1');

    //add expected
    cy.get('[data-testid="addEditCaseStepExpected"]').last().type('expected1');

     //add step2
     cy.get('[data-testid="addEditCaseAddStep"]').last().click();

     //add step
     cy.get('[data-testid="addEditCaseStepContent"]').last().type('step2');
 
     //add expected
     cy.get('[data-testid="addEditCaseStepExpected"]').last().type('expected2');

     //confirm to add test case
     cy.get('[data-testid="addTestCaseButton"]').click();

  });

  it('remove a character', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://gotit.testrail.net/');
    cy.get('[data-testid="loginIdName"]').clear();
    cy.get('[data-testid="loginIdName"]').type('manh@gotitapp.co');
    cy.get('[data-testid="loginPasswordFormDialog"]').type('SGFuMTIzZG8h');
    cy.wait(1000)
    cy.get('[data-testid="loginButtonPrimary"]').click();
    cy.wait(1000)
    cy.visit('https://gotit.testrail.net/index.php?/suites/view/350&group_by=cases:section_id&group_id=17665&group_order=asc&display_deleted_cases=0');

    /*change title
    cy.get('#row-73337 > :nth-child(4) > [href="javascript:void(0)"] > [data-testid="addSubsectionEditIcon"]').click({force: true});
    cy.get('#editCaseTitle').clear().type('A test case 1');
    cy.get('.editCaseEdit').click();
    cy.wait(1000)
    cy.get('#row-73340 > :nth-child(4) > [href="javascript:void(0)"] > [data-testid="addSubsectionEditIcon"]').click({force: true});
    cy.get('#editCaseTitle').clear().type('There is a TC 1');
    cy.get('.editCaseEdit').click();
    cy.wait(1000)
    */

    // Get all 'span' elements with class 'title' inside 'tr' elements
    cy.get('tr span.title')
      .should('have.length', 16)
      .each(($element, index, $list) => {
        // Get the text content of the current element
        const text = $element.text();
        console.log('text:', text)

        // Check if the text includes "a", "an", or "the"
        //\s: Matches any whitespace character (spaces, tabs, line breaks).
        // if (/\s(a|an|the)\s|(a|an|the)\s|\s(a|an|the)/i.test(text)) {
        if (/\s(an|a|the)\s|(an|a|the)\s|\s(an|a|the)/i.test(text)) {
          // if (/A\s/i.test(text)) {
          // Print the text to the Cypress command log
          cy.log(`Element ${index + 1} contains "a/an/the": ${text}`);
          cy.get(`a:has(span[data-testid='sectionCaseTitle'])+a`).eq(index).click({ force: true })
          // Clear and type new text in #editCaseTitle
          // const newText = text.replace(/\s(a|an|the)\s|(a|an|the)\s|\s(a|an|the)/ig, ''); // Remove "a", "an", or "the" with whitespace

          //approach 1: replace by removing characters
          //const newText = text.replace(/\s(sample|demo)\s/ig, ''); // Remove "a", "an", or "the" with whitespace

          /*approach 2: replace by adding "s" characters
          const newText = text.replace(/\s(sample|demo)\s/ig, (match, p1) => {
            let newReplacement;
            switch (true) {
              case /^\s/.test(match) && /\s$/.test(match):
                // Whitespace before and after "s"
                newReplacement = ' ' + p1 + 's' + ' ';
                break;
              case /\s$/.test(match):
                // Whitespace only after "s"
                newReplacement = p1 + 's' + ' ';
                break;
              case /^\s/.test(match):
                // Whitespace only before "s"
                newReplacement = ' ' + p1 + 's';
                break;
              default:
                // No whitespace before or after "s"
                newReplacement = p1 + 's';
            }
            return newReplacement;
          });
          */

          //approach 3: replace by removing characters and whitespace
          const newText = text.replace(/\s(an|a|the)\s|(an|a|the)\s|\s(an|a|the)/ig, (match, p1) => {
            let newReplacement;
            switch (true) {
              case /^\s/.test(match) && /\s$/.test(match):
                newReplacement = ' '; // 'there is the day' -> there is day
                break;
              case /\s$/.test(match):
                newReplacement = '';  // 'the day' -> day
                break;
              case /^\s/.test(match):
                newReplacement = ''; // 'day the' -> day
                break;
              default:
                // keep the same
                newReplacement = p1;
            }
            return newReplacement;
          });

          //end of approach list

          cy.get('#editCaseTitle').clear().type(newText);
          cy.get('.editCaseEdit').click();
          cy.wait(1000)
        }

        // Print the text to the Cypress command log
        // cy.log(`Element ${index + 1} text: ${text}`);
      });
  });
})