describe('template spec', () => {
  beforeEach(() => {
    cy.loginByAPIgetRefreshToken('https://mathgpt-api-dev.tutoruniverse.net/token-refreshes', `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NjQiLCJleHAiOjE3MDk1NTAyMjcsImp0aSI6ImI3MTgwMDg0ZDQ5NjExZWViN2U1YmVhOTQ1MTBkNzQ1IiwiaXNzIjoiZ290LWl0LmFpL3Bob3Rvc3R1ZHkifQ.bechdNejJbc9_EpVjJq6UoGxRVxXL-zeruh6wtsBoy13ICCZwyuhMdMNaB8RXbW0HWYtIveDMDvTz8xfpNUMAwzow_RKDRG41O4IyZcW2r9XzvBIX_Vh16Ztra72iz9_rMTYTSKT9Qzs5srr7-d71bJ6W70YG8EhJ5dt3xMVSsrroj5cVKcB0bJag-CXHDTmUqdV5NRwSJHNDMJHA02wHabYUGKVLd2OYvVY6sErFmM2mUlSEt-ozpfKBqpp_dsV0BkQ-pIRNB0i42hGinX2gBefK3HaLPGyahRm0hiOgaeyXJmGZPmIJYi9vCGcjZ0sGguFnrP1wA_RBjC0RFx09w`)
  })

  it.skip('importCanvas1', function () {

    const demoValues = ['demo1', 'demo2', 'demo3'];

    for (const demoValue of demoValues) {
      // Visit the URL and click on "Import from Canvas"
      cy.visit('https://dev.mathgpt.ai/courses/new');
      cy.contains('Import from Canvas').click({ force: true });

      // Click on the button for the current demoValue
      cy.get('[class^=CourseItemWrapper]').each(($parentElement) => {
        const specificElement = $parentElement.find('> div:last-child > div > div:first-child > div:first-child');

        if (specificElement.text().includes(demoValue)) {
          $parentElement.find('> div:last-child > div > div:last-child > button').click();
        }
      });
      cy.wait(3000)

      cy.get('#react-select-2-placeholder').click();
      cy.get('#react-select-2-option-2').click();

      //import student
      cy.get('.FormCheck').click();

      //select Algebra book
      cy.contains('College Algebra 2e').click()

      cy.contains('Create course').last().click()

      cy.contains('Yay! Your course has been created.')
      cy.contains('This course has been imported from Canvas.')
      cy.contains('Last updated from Canvas:')

      cy.contains('Students').click()
      cy.contains('Student name')

      cy.wait(3000)
    }

  })

  it.skip('create a Canvas account', function(){
    cy.visit('https://canvas.tutoruniverse.net/enroll/XW974W');
    cy.get('#student_email').clear().type('manh+demo3@gotitapp.co');
    cy.wait(1000)
    cy.contains('I am a new user').click()
    cy.get('#student_name').type('manh+demo3@gotitapp.co');
    cy.get('#submit_button').click();
    //sign out
    cy.get('img')
    cy.contains('Logout')
  })
  
  it('create 60 Canvas accounts', function () {
    const accountsToCreate = 30;
    const emailPrefix = 'manh+demo';
    const baseEmail = '@gotitapp.co';
  
    for (let i = 45; i <= accountsToCreate + 44; i++) {
      const email = emailPrefix + i + baseEmail;
  
      cy.visit('https://canvas.tutoruniverse.net/enroll/XW974W');
      cy.wait(2000);
      cy.get('#student_email').clear().type(email);
      cy.wait(2000);
      cy.contains('I am a new user').click();
      cy.get('#student_name').type(email);
      cy.wait(2000)
      cy.get('#submit_button').click();
      cy.wait(2000)
      cy.visit('https://canvas.tutoruniverse.net/')
      cy.wait(5000);
      //sign out
      cy.get('#global_nav_profile_link').click()
      cy.log('email: '+email)
      cy.wait(2000);
      cy.contains('Logout').click()
      cy.wait(2000);
      cy.visit('https://canvas.tutoruniverse.net/')
      cy.wait(2000);

    }
  });

  it.skip('use Canvas admin to add user/pass, remove old user, update new user email', function(){
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://canvas.tutoruniverse.net/login/canvas');
    cy.get('#pseudonym_session_unique_id').type('jon@gotitapp.co');
    cy.get('#pseudonym_session_password').type('b1CtUXftRhF2');
    cy.get(`input[value='Log In']`).click();

    cy.visit('https://canvas.tutoruniverse.net/accounts/2/users');
    cy.wait(1000)
    cy.get('#TextInput_1').type('manh+demo2@gotitapp.co');
    cy.wait(1000)
    //click on expected email to change pass
    cy.get(`a[data-cid='Link']`).click();
    cy.wait(1000)
    //Add Login
    cy.get('.add_pseudonym_link').click();
    //input new credentials
    cy.get('#pseudonym_unique_id').type('manh+demo2a@gotitapp.co');
    cy.get('#pseudonym_password').type('Aa123456@');
    cy.get('#pseudonym_password_confirmation').type('Aa123456@');
    //Click "Add Login" button
    cy.get('#edit_pseudonym_form > .form-controls > .btn-primary').click();
    //Delete the first Login information
    cy.get(':nth-child(1) > .links > .delete_pseudonym_link > .icon-end').click();
    //Edit the second Login information to become the first
    cy.get('[style=""] > .links > .edit_pseudonym_link > .icon-edit').click();
    cy.get('#pseudonym_unique_id').clear().type('manh+demo2@gotitapp.co');
    //Update Log in
    cy.get('#edit_pseudonym_form > .form-controls > .btn-primary').click();
  })
})
