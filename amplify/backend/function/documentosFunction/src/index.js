c// amplify/backend/function/documentosFunction/src/index.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        switch (event.httpMethod) {
            case 'GET':
                const params = {
                    TableName: 'documentos-dev'
                };
                const data = await dynamoDb.scan(params).promise();
                return {
                    statusCode: 200,
                    body: JSON.stringify(data.Items)
                };
                
            case 'POST':
                const documento = JSON.parse(event.body);
                documento.id = Date.now().toString();
                documento.fecha = new Date().toISOString();
                
                await dynamoDb.put({
                    TableName: 'documentos-dev',
                    Item: documento
                }).promise();
                
                return {
                    statusCode: 201,
                    body: JSON.stringify({ id: documento.id })
                };
                
            default:
                return {
                    statusCode: 405,
                    body: 'Método no permitido'
                };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};