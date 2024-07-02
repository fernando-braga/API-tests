/// <reference types="cypress"/>

describe('Update devices', () => {

    it('Update device', () => {

        const currentDate = new Date().toISOString().slice(0,10);
        const body = require('../fixtures/update-device.json')

        const bodyUpdated = {
            "name": "Celular da QAZANDO - UPDATED",
            "data": {
               "year": 2024,
               "price": 999,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
                   "Owner": " Company QAzando LTDA"
            }
         }
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult');

        // Get the ID from result
        cy.get('@postDeviceResult').then((responsePost) => {
            expect(responsePost.status).equal(200);
            expect(responsePost.body.name).equal(body.name);
            expect(responsePost.body.data.Owner).equal(body.data.Owner);
        
        // do PUT request
            cy.request({
            method: 'PUT',
            url: `/objects/${responsePost.body.id}`,
            failOnStatusCode: false,
            body: bodyUpdated
        }).as('putDeviceResult');

        cy.get('@putDeviceResult').then((responsePut) => {
            expect(responsePut.status).equal(200);
            expect(responsePut.body.name).equal(bodyUpdated.name);
            expect(responsePut.body.data.Owner).equal(bodyUpdated.data.Owner);
            expect(responsePut.body.updatedAt.slice(0,10)).equal(currentDate);
        })
        })
    
    });

})