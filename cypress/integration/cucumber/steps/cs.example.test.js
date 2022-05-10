import { Given } from "cypress-cucumber-preprocessor/steps"
import { loginPage } from "../../examples/pages/cs.login.page"

Given(`I visit CS Site`, () => {
    //Visit ExecuteAutomation Website
    cy.visit('http://testing.com/')
    
})

Given(`I click login link`, () => {
    cy.contains('Login').click();
})

// Given(`I login as user with {string} and {string}`, (userName, password) => {
//     //Enter username and password
//     cy.get('#UserName').type(userName);
//     cy.get('#Password').type(password,{log:false});
//     cy.get('.btn').click();
// })

Given(`I login as following`, datatable => {

    datatable.hashes().forEach(row => {
        // cy.get('#UserName').type(row.userName);
        // cy.get('#Password').type(row.Password,{log:false});
        loginPage.performLogin(row.userName,row.Password);
    });

    //Instead of direct click
    //cy.get('.btn').click();
    loginPage.clickLoginButton();
})