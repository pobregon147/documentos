const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        switch (event.httpMethod) {
            case 'GET':
                const data = await dynamoDb.scan({ TableName: 'Documentos' }).promise();
                return {
                    statusCode: 200,
                    headers: { 
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(data.Items)
                };

            case 'POST':
                const documento = JSON.parse(event.body);
                documento.id = Date.now().toString();
                documento.fecha = new Date().toISOString();

                await dynamoDb.put({
                    TableName: 'Documentos',
                    Item: documento
                }).promise();

                return {
                    statusCode: 201,
                    headers: { 
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json' 
                    },
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