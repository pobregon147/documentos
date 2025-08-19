/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_ALMACENAMIENTODOCUMENTOS_BUCKETNAME
	STORAGE_PLACEHOLDERDB_ARN
	STORAGE_PLACEHOLDERDB_NAME
	STORAGE_PLACEHOLDERDB_STREAMARN
Amplify Params - DO NOT EDIT */// amplify/backend/function/documentosFunction/src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const app = express();
app.use(bodyParser.json());

// Configuración para CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

const client = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

// --- CAMBIO CLAVE AQUÍ ---
// Ignoramos la tabla placeholder y apuntamos directamente a la tabla con los datos
const tableName = "resoluciones_bd"; 

/**********************
 * Rutas de la API    *
 **********************/

app.get('/documentos', async (req, res) => {
    try {
        const data = await ddbDocClient.send(new ScanCommand({ TableName: tableName }));
        res.json(data.Items);
    } catch (err) {
        res.status(500).json({ error: 'Could not load items: ' + err.message });
    }
});

app.post('/documentos', async (req, res) => {
    const documento = req.body;
    documento.id = Date.now().toString();
    const params = { TableName: tableName, Item: documento };
    try {
        await ddbDocClient.send(new PutCommand(params));
        res.status(201).json({ success: 'Documento creado!', id: documento.id });
    } catch (err) {
        res.status(500).json({ error: 'Could not create document: ' + err.message });
    }
});

app.put('/documentos', async (req, res) => {
    const params = { TableName: tableName, Item: req.body };
    try {
        await ddbDocClient.send(new PutCommand(params));
        res.json({ success: 'Documento actualizado!' });
    } catch (err) {
        res.status(500).json({ error: 'Could not update document: ' + err.message });
    }
});

app.delete('/documentos/:id', async (req, res) => {
    const params = { TableName: tableName, Key: { id: req.params.id } };
    try {
        await ddbDocClient.send(new DeleteCommand(params));
        res.json({ success: 'Documento borrado!' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete document: ' + err.message });
    }
});


app.listen(3000, function() {
    console.log("App started");
});

module.exports = app;