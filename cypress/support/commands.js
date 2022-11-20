import "cypress-localstorage-commands";

Cypress.Commands.add("login", (email = "anonymous@anonymous.com", password = "pQSwekqPep5WRR") => {
    cy.request({
        method: 'POST',
        url: '/users/login',
        body: {
            email: email,
            password: password,
        }
    })
        .its('body.result')
        .then(result => {
            cy.setLocalStorage("token", result.token);
            cy.setLocalStorage("username", result.email);
        });
});