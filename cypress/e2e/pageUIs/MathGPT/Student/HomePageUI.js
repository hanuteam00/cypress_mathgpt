//Step 1: Using css selector to find elements on each page
const GREATING_MESSAGE = `.GreetingHeading > div`;
const INSTRUCTOR_BADGE = `div[class^='InstructorBadge']`;
const INSTRUCTOR_SUMMARY = `div[class='u-marginTopExtraSmall']`;
const CREATE_COURSE_SUMMARY = `div[class^='u-marginTopExtraSmall u-paddingTopTiny']`;

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class HomePageUI {
    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get greatingMessage() { return cy.get(GREATING_MESSAGE); }
    get instructorBadge() { return cy.get(INSTRUCTOR_BADGE); }
    get instructorSummary() { return cy.get(INSTRUCTOR_SUMMARY); }
    get createCourseSummary() { return cy.get(CREATE_COURSE_SUMMARY); }

    //way2: store elements as properties of class
    elements = {
        url: () => cy.url(),
        greatingMessage: () => cy.get(GREATING_MESSAGE),
        instructorBadge: () => cy.get(INSTRUCTOR_BADGE),
        instructorSummary: () => cy.get(INSTRUCTOR_SUMMARY),
    }
}
