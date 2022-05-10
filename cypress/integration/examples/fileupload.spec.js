/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
        //Visit Demo Website - Reading from environment variables
        cy.visit("https://fineuploader.com/demos.html");


    })

    it.only("File upload demo", () => {
        cy.percySnapshot("Before");
        cy.fixture('EAWeekly.png','base64').then(fileContent => {
            cy.get('#fine-uploader-s3 > .qq-uploader-selector > .qq-upload-button-selector > input').upload({
                fileContent,
                fileName: 'EAWeekly.png',
                mimeType: 'image/png'
            },
            {
                uploadType:'input'
            }
            )
        });
        cy.percySnapshot("after");
    })

});