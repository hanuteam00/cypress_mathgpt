it('random checkbox selected', function () {

    //list of elements
    cy.visit('https://form-devs.s3.eu-central-1.amazonaws.com/formulario.html')
    cy.clickAll('#check input[type="checkbox"]')

    // cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    // cy.clickAllXpath(`//input[@type='checkbox']`)

    // cy.get('#check input[type="checkbox"]')
    //     .as('checkboxes')
    //     .check()


    // cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    // //send mess
    // customType(`#sendMessage`)


    // //contact us
    // customType(`#contactUs`)

    // => dong goi thanh 1 cai type chung

    // .clear().type('YOUR_TEXT_HERE')


    //     randCheckboxSel('//input[@type=\'checkbox\']')
    // })    
    // cy.xpath('//input[@type=\'checkbox\']')
    //     .its('length')
    //     .then((n) => Cypress._.random(0, n - 1))
    //     .then((k) => {
    //         cy.log(`picked random index ${k}`)
    //         cy.xpath('//input[@type=\'checkbox\']').eq(k).click()
    //     })
})