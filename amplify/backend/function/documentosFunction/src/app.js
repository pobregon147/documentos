// amplify/backend/function/documentosFunction/src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const app = express();
app.use(bodyParser.json());

// Configuración para CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// Configuración de DynamoDB con el SDK v3
const client = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

// El nombre de la tabla se obtiene de las variables de Amplify
let tableName = "Documentos";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

/**********************
 * Rutas de la API    *
 **********************/

// --- Ruta GET para obtener todos los documentos ---
app.get('/documentos', async (req, res) => {
    try {
        const data = await ddbDocClient.send(new ScanCommand({ TableName: tableName }));
        res.json(data.Items);
    } catch (err) {
        res.status(500).json({ error: 'Could not load items: ' + err.message });
    }
});

// --- Ruta POST para crear un nuevo documento ---
app.post('/documentos', async (req, res) => {
    const documento = req.body;
    
    // Asignamos un ID único al documento
    documento.id = Date.now().toString();
    
    const putItemParams = {
        TableName: tableName,
        Item: documento
    };

    try {
        await ddbDocClient.send(new PutCommand(putItemParams));
        res.status(201).json({ success: 'Documento creado!', id: documento.id });
    } catch (err) {
        res.status(500).json({ error: 'Could not create document: ' + err.message });
    }
});

app.listen(3000, function() {
    console.log("App started");
});

module.exports = app;