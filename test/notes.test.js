'use strict';

let init = require('./steps/init');
let { an_authenticated_user } = require('./steps/given');
let { we_invoke_createNote, we_invoke_updateNote, we_invoke_deleteNote } = require('./steps/when');
let idToken;

let noteId = "1008";

describe(`Given an authentication user`, () => {
    beforeAll(async () => {
        init();
        let user = await an_authenticated_user();
        idToken = user.AuthenticationResult.IdToken;
    });

    describe(`When we invoke POST /notes endpoint`, () => {
        it(`Should create a new note`, async () => {
            //console.log(idToken);
            const body = {
                id: noteId,
                title: "1st note",
                body: "Hello World!"
            }
            let result = await we_invoke_createNote({idToken, body});
            console.log(result);
            expect(result.statusCode).toEqual(201);
        });
    });

    describe(`When we invoke PUT /notes/{noteId}  endpoint`, () => {
        it(`Should update a note`, async () => {
            const body = {
                title: "1st note",
                body: "Update World!"
            }
            let result = await we_invoke_updateNote({idToken, noteId, body});
            console.log(result);
            expect(result.statusCode).toEqual(200);
        });
    });

    describe(`When we invoke DELETE /notes/{noteId} endpoint`, () => {
        it(`Should delete a note`, async () => {
            let result = await we_invoke_deleteNote({idToken, noteId});
            console.log(result);
            expect(result.statusCode).toEqual(200);
        });
    });

});