describe('Đăng ký người dùng', () => {
    it.only('Nhập thông tin đăng ký bằng cách sử dụng cy.get()', () => {
        cy.visit('http://localhost:3000');

        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Doe');
        cy.get('#email').type('john.doe@example.com');

        cy.get('#submitButton').click();
    });

    it.only('Nhập thông tin đăng ký bằng cách sử dụng cy.wrap()', () => {
        cy.visit('http://localhost:3000');

        const inputFields = ['John', 'Doe', 'john.doe@example.com', 'Username', 'Password'];
        cy.get('input').each(($input, index) => {
            cy.wrap($input).type(inputFields[index]);
        });

        cy.get('#submitButton').click();
    });

    it('multiMatching', function () {

        //way 1: use eq jquery
        cy.visit('https://the-internet.herokuapp.com/login');
        cy.get('input').eq(0).type('tomsmith');
        cy.get('input').eq(1).type('SuperSecretPassword!');
        cy.get(`button[type='submit']`).click();

        //way 2: use "closure approach"
        cy.visit('https://the-internet.herokuapp.com/login');
        cy.get('input').then(items => {
            cy.get(items[0]).type('tomsmith');
            cy.get(items[1]).type('SuperSecretPassword!');
        })
        cy.get(`button[type='submit']`).click();

        //way 3: use .each()
        cy.log('way 3')
        cy.visit('https://the-internet.herokuapp.com/login');
        cy.get('input').each(($input, index) => {
            // $input is the current input element
            // index is the index of the current input element in the collection
            // Perform actions on each input element directly
            if (index === 0) {
                // Perform action on the first input element
                cy.get($input).type('tomsmith');
            } else if (index === 1) {
                // Perform action on the second input element
                cy.get($input).type('SuperSecretPassword!');
            }
        });

        // Click the submit button
        cy.get(`button[type='submit']`).click();


    });

});
