/// <reference types="Cypress" />

context('Login-input-test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
    })

    it('input valid email and password', () => {
        cy.get('.login-input').within(() => {
            cy.get('input').should('have.length', 2);
            cy.get('input').eq(0).type("fake@email.com").should('have.value', 'fake@email.com');
            cy.get('input').eq(1).type("password").should('have.value', 'password');
        })
    })

    it('input empty email', () => {
        cy.get('.login-input').within(() => {
            cy.get('input').should('have.length', 2);
            cy.get('input').eq(0).focus();
            cy.get('input').eq(1).focus();
            cy.get('.el-form-item__error').should('have.text', '\n          邮箱不能为空\n        ');
        })
    })

    it('input invalid email', () => {
        cy.get('.login-input').within(() => {
            cy.get('input').should('have.length', 2);
            // before input anything, there shouldn't be a prompt
            cy.get('.el-form-item__error').should('not.exist');
            // no @
            cy.get('input').eq(0).type("fakeemail.com");
            // imply end of input by focusing on elsewhere
            cy.get('input').eq(1).focus();
            // after confirm the email is invalid,
            // 1. red border
            cy.get('input').eq(0).should('have.css', 'border-color', 'rgb(245, 108, 108)');
            // 2. text inform
            cy.get('.el-form-item__error').should('have.text', '\n          请输入正确的邮箱\n        ');
        })
    })

    it('input valid email but no password', () => {
        cy.get('.login-input').within(() => {
            cy.get('input').should('have.length', 2);
            // before input anything, there shouldn't be a prompt
            cy.get('.el-form-item__error').should('not.exist');
            // no @
            cy.get('input').eq(0).type("fake@email.com");
            // imply end of input by focusing on elsewhere
            cy.get('input').eq(1).focus();
            cy.get('input').eq(0).focus();
            // after confirming the password is invalid (empty)
            // 1. red border
            cy.get('input').eq(1).should('have.css', 'border-color', 'rgb(245, 108, 108)');
            // 2. text inform
            cy.get('.el-form-item__error').should('have.text', '\n          请输入密码\n        ');
        })
    })
})

context('Login-submit-test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
    })

    it('input email and password then submit', () => {
        cy.get('.load-container').should('not.exist');
        cy.get('input').should('have.length', 2);
        cy.get('input').eq(0).type("fake@email.com").should('have.value', 'fake@email.com');
        cy.get('input').eq(1).type("password").should('have.value', 'password');
        cy.get('form').submit();
    })
});