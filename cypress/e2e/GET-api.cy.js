/// <reference types="cypress"/>

describe('Search devices', () => {

    it('Search for especific device', () => {

        const deviceId = '7'
        cy.searchForEspecificDevice(deviceId).as('getDeviceResult');

        // validations

        cy.get('@getDeviceResult').then((response) => {
            expect(response.status).equal(200);
            expect(response.body.id).equal(deviceId);
            expect(response.body.name).equal('Apple MacBook Pro 16');
            expect(response.body.data).not.empty;
            expect(response.body.data.year).equal(2019);
            expect(response.body.data.price).equal(1849.99);
            expect(response.body.data['CPU model']).equal('Intel Core i9');
            expect(response.body.data['Hard disk size']).equal('1 TB');
        });
    });

    it('Search for an inexistent device', () => {
        const deviceId = 'xpto'

        cy.searchForEspecificDevice(deviceId).then((response) => {
            expect(response.status).equal(404);
            expect(response.body.error).equal(`Oject with id=${deviceId} was not found.`)
        })
    })
})