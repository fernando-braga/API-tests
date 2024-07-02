/// <reference types="cypress"/>

describe('Register devices', () => {
    const payLoadRegisterDevice = require('../fixtures/register-device.json')

    it('Register device', () => {

        const currentDate = new Date().toISOString().slice(0,10);

         cy.registerDevice(payLoadRegisterDevice).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.id).not.empty;
            expect(response.body.createdAt).not.empty;
            expect(response.body.createdAt.slice(0,10)).equal(currentDate);
            expect(response.body.name).equal("Celular da QAZANDO");
        })
    
    });
    
    it('Register a empty device', () => {

        const errorMessage = '400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.'
        cy.registerDevice('').then((response) => {
            expect(response.status).equal(400);
            expect(response.body.error).equal(errorMessage);
        })
    })
})