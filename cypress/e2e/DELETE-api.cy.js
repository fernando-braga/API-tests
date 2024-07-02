/// <reference types="cypress"/>

describe('Delete devices', () => {

    it('Delete device', () => {

        const body = {
            "name": "Celular da QAZANDO",
            "data": {
               "year": 2024,
               "price": 999,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
                   "Owner": "QAzando LTDA"
            }
         }
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult');
        cy.get('@postDeviceResult').then((responsePost) => {
            expect(responsePost.status).equal(200);
            
            cy.request({
            method: 'DELETE',
            url: `/objects/${responsePost.body.id}`,
            failOnStatusCode: false
        }).as('deleteDeviceResult');

        cy.get('@deleteDeviceResult').then((responseDelete) => {
            expect(responseDelete.status).equal(200);
            expect(responseDelete.body.message).equal(`Object with id = ${responsePost.body.id} has been deleted.`)
        })
        })        
    
    });

    it('Delete a not existent device', () => {

        const inexistentID = 'fernando';

        cy.request({
            method: 'DELETE',
            url: '/objects/fernando',
            failOnStatusCode: false
        }).as('deleteDeviceResult');

        cy.get('@deleteDeviceResult').then((responseDelete) => {
            expect(responseDelete.status).equal(404);
            expect(responseDelete.body.error).equal(`Object with id = ${inexistentID} doesn't exist.`)
        })

    });

    it('Delete an reserved object', () => {
        const error = '6 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.'

        cy.request({
            method: 'DELETE',
            url: '/objects/6',
            failOnStatusCode: false
        }).as('deleteDeviceResult');

        cy.get('@deleteDeviceResult').then((responseDelete) => {
            expect(responseDelete.status).equal(405);
            expect(responseDelete.body.error).equal(error);
        })

    })
   
})