'use strict';

const _ = require("lodash");
//https://www.npmjs.com/package/superagent-promise
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

makeHTTPRequest = async (path, method, options) => {
    let TEST_ROOT = process.env.TEST_ROOT;
    let url = options.noteId ? `${TEST_ROOT}/${path}/${options.noteId}` : `${TEST_ROOT}/${path}`;
    let httpReq = agent(method, url);
    let body = _.get(options, "body");
    let idToken = _.get(options, "idToken");
    console.log(`Invoking http ${method} ${url}`);
    try{
        // Set Authorization
        httpReq.set("Authorization", idToken);
        if(body){
            httpReq.send(body);
        }
        let response = await httpReq;
        return {
            statusCode: response.status,
            body: response.body
        }
    }catch(err){
        //console.log(err);
        return {
            statusCode: err.status,
            body: null
        }
    }
}

exports.we_invoke_createNote = (options) => {
    //Make HTTP call to out API Gateway
    let result = makeHTTPRequest("notes", "POST", options);
    return result;
}

exports.we_invoke_updateNote = (options) => {
    //Make HTTP call to out API Gateway
    let result = makeHTTPRequest("notes", "PUT", options);
    return result;
}

exports.we_invoke_deleteNote = (options) => {
    //Make HTTP call to out API Gateway
    let result = makeHTTPRequest("notes", "DELETE", options);
    return result;
}