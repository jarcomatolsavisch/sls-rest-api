const generatePolicy = (principalId, effect, resource) => {
    let authResponse = {};

    // make resource from "arn:aws:execute-api:ap-northeast-1:011452834432:hgmg7xwh6f/dev/GET/notes"
    // to "arn:aws:execute-api:ap-northeast-1:011452834432:hgmg7xwh6f/*/*"
    // ref: https://repost.aws/knowledge-center/api-gateway-403-error-lambda-authorizer
    let tmp = resource.split(':');
    let apiGatewayArnTmp = tmp[5].split('/');
    resource = tmp[0] + ":" + tmp[1] + ":" + tmp[2] + ":" + tmp[3] + ":" + tmp[4] + ":" + apiGatewayArnTmp[0] + '/*/*'; 
    
    authResponse.principalId = principalId;
    if(effect, resource){
        let policyDocument = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": effect,
                    "Resource": resource,
                    "Action": "execute-api:Invoke",
                }
            ]
        };
        authResponse.policyDocument = policyDocument;
    }
    // Pass some values from authorizer to lambda endpoint
    authResponse.context = {
        foo: "bar"
    }
    console.log(JSON.stringify(authResponse));
    return authResponse;
}
module.exports.handler = (event, context, callback) => {
    //lambda authorizer
    let token = event.authorizationToken; // "allow" or "deny"
    switch(token) {
        case "allow":
            //return IAM policy to the API geteway
            callback(null, generatePolicy("user", "Allow", event.methodArn));
            break;
        case "deny":
            callback(null, generatePolicy("user", "Deny", event.methodArn));
        default:
            callback("Error: Invalid statement");
    }
}
