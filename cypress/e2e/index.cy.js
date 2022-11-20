/// <reference types="Cypress" />

context('Index-anonymous', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login();
        cy.visit('http://localhost:8080/index')
    })

    it('test layout', () => {
        cy.getLocalStorage('username').should('eq', "anonymous@anonymous.com");

        // anonymous login should have Signup and Login button on the right
        cy.get('.vnb__menu-options--right').within(() => {
            cy.get('a').should('have.length', 2);
            cy.get('a').eq(0).should('have.attr', 'href').and('include', 'register');
            cy.get('a').eq(1).should('have.attr', 'href').and('include', 'login');
        });
    })
});

context('Index-user', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login("test@test.com", "test123");
        cy.visit('http://localhost:8080/index')
    })

    it('test layout', () => {
        cy.getLocalStorage('username').should('eq', "test@test.com");

        // valid user login should have Logout on the right
        cy.get('.vnb__menu-options--right').within(() => {
            cy.get('a').should('have.attr', 'href').and('include', 'logout');
        });
    })
});