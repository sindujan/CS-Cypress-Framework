// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';
import '@percy/cypress';


//-- Login as a command --
Cypress.Commands.add('login', (clientcode, username, password) => { 
    
    cy.get('.form').within(() => {
        //Client Code
        cy.get('#ClientCode').invoke('attr', 'placeholder').should('contain', 'Client Code')
        cy.get('#ClientCode').type(clientcode).should('have.value', clientcode)
        
        cy.get('#NextButton').contains('Next').should('be.enabled').click()
        
    })

    cy.get('.form').within(() => {
        //Username
        cy.get('#UserName').invoke('attr', 'placeholder').should('contain', 'Username')
        cy.get('#UserName').type(username).should('have.value', username)

        //Password
        cy.get('#Password').invoke('attr', 'placeholder').should('contain', 'Password')
        cy.get('#Password').type(password, {log: false})
        
        cy.get('#LoginButton')
        cy.get('#LoginButton').contains('Sign In').should('be.enabled').click()
    })

    const d = new Date();
    let hours = d.getHours();

    var message = hours < 12 ? 'Good morning!' : hours < 18 ? 'Good afternoon!' : 'Good evening!';

    //Greeting message verification
    cy.get('#time').contains(message)

 })
