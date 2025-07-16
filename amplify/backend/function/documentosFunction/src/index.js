c// amplify/backend/function/documentosFunction/src/index.js

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        switch (event.httpMethod) {
            // ... (la lógica del GET sigue igual) ...

            case 'POST':
                const documento = JSON.parse(event.body);

                // Aseguramos que el ID y la fecha se tomen del frontend
                // Si no vienen, podemos asignar valores por defecto, pero no sobreescribirlos
                if (!documento.id) {
                    documento.id = Date.now().toString();
                }
                // IMPORTANTE: Ya no sobreescribimos la fecha
                // if (!documento.fecha) {
                //    documento.fecha = new Date().toISOString();
                // }

                await dynamoDb.put({
                    TableName: 'Documentos', // Asegúrate que el nombre de la tabla sea correcto
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