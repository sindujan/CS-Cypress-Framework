/// <reference types="Cypress" />

context("Test LambdaTest Website XHR", () => {


    beforeEach("Navigate to LambdaTest", () => {
        cy.visit("https://accounts.lambdatest.com/login");
    })

    it("Perform Login and verify XHR", () => {

        //Start the server
        cy.intercept();

        cy.intercept({
            method:'GET',
            url: '/api/user/organization/team'
        }).as('team');

        cy.intercept({
            method: 'GET',
            url: '/api/user/organization/automation-test-summary'
        }).as('apicheck');


        cy.fixture("lamdaUser").as("lamdauser");

        cy.get("@lamdauser").then((lamdauser) => {
            cy.get("[name='email']").debug().type(lamdauser.UserName);
            cy.get("[name='password").debug().type(lamdauser.Password, { log: false });
        });
        
        cy.get("[class='btn btn-primary btn-lg btn-block mt-3']").click();


        cy.get("@team").then((xhr) =>{
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body.data[0]).to.have.property("name","Username");
            expect(xhr.response.body.data[0]).to.have.property("role","Admin");
        })

        //traffic interseption - Explicit Assertion
        cy.get('@apicheck').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.response.body).to.have.property("maxQueue", 150)
        })

        //Implicit assertion
        cy.get("@apicheck").its('response.body').should('have.property','maxQueue').and('eql', 150);


    });

    it('Verify LambdaTest cookies', () => {
        
        cy.fixture("lamdaUser").as("lamdauser");

        cy.get("@lamdauser").then((lamdauser) => {
            cy.get("[name='email']").debug().type(lamdauser.UserName);
            cy.get("[name='password").debug().type(lamdauser.Password, { log: false });
        });
        
        cy.get("[class='btn btn-primary btn-lg btn-block mt-3']").click();

        cy.getCookie('user_id').should('have.property','value','41224');
    })

});