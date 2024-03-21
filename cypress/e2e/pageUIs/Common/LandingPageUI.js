//https://dev.mathgpt.ai/
//Step 1: Using css selector to find elements on each page
const LOGIN_DROPDOWN_BUTTON = `button[class^='DropdownButton']`;
const LOGIN_AS_INSTRUCTOR = `div[class^='DropdownContainer'] > button:nth-child(1)`;
const LOGIN_AS_STUDENT = `div[class^='DropdownContainer'] > button:nth-child(2)`;

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class LandingPageUI {
    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get loginDropdown() { return cy.get(LOGIN_DROPDOWN_BUTTON); }
    get loginAsInstructor() { return cy.get(LOGIN_AS_INSTRUCTOR); }
    get loginAsStudent() { return cy.get(LOGIN_AS_STUDENT); }

    //way2: store elements as properties of class
    elements = {
        url: () => cy.url(),
        loginDropdown: () => cy.get(LOGIN_DROPDOWN_BUTTON),
        loginAsInstructor: () => cy.get(LOGIN_AS_INSTRUCTOR),
        loginAsStudent: () => cy.get(LOGIN_AS_STUDENT),

    }
}
