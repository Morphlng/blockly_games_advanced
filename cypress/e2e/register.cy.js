/// <reference types="Cypress" />

context("Register", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080/register");
    });

    it("input valid email and password", () => {
        cy.get(".login-input").within(() => {
            cy.get("input").should("have.length", 3);
            cy.get("input")
                .eq(0)
                .type("fake@email.com")
                .should("have.value", "fake@email.com");
            cy.get("input")
                .eq(1)
                .type("password123")
                .should("have.value", "password123");
            cy.get("input")
                .eq(2)
                .type("password123")
                .should("have.value", "password123");
        });
    });
});
