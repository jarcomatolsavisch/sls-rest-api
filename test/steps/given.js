'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-1';
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.an_authenticated_user = async() => {

    const params = {
        UserPoolId: process.env.USER_POOL_ID,
        ClientId: process.env.CLIENT_ID,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: { 
            USERNAME: process.env.USERNAME,
            PASSWORD: process.env.PASSWORD
        }
    };

    let user = await cognito.adminInitiateAuth(params).promise();
    return user;
}
