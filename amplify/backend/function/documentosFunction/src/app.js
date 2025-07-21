// amplify/backend/function/documentosFunction/src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Habilitamos más métodos
    next();
});

const client = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

let tableName = "Documentos";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

// --- Ruta GET (sin cambios) ---
app.get('/documentos', async (req, res) => {
    try {
        const data = await ddbDocClient.send(new ScanCommand({ TableName: tableName }));
        res.json(data.Items);
    } catch (err) {
        res.status(500).json({ error: 'Could not load items: ' + err.message });
    }
});

// --- Ruta POST (sin cambios) ---
app.post('/documentos', async (req, res) => {
    const documento = req.body;
    documento.id = Date.now().toString();
    const putItemParams = { TableName: tableName, Item: documento };
    try {
        await ddbDocClient.send(new PutCommand(putItemParams));
        res.status(201).json({ success: 'Documento creado!', id: documento.id });
    } catch (err) {
        res.status(500).json({ error: 'Could not create document: ' + err.message });
    }
});

// --- NUEVA RUTA PUT para Actualizar un documento ---
app.put('/documentos', async (req, res) => {
    const documento = req.body;
    const putItemParams = {
        TableName: tableName,
        Item: documento
    };
    try {
        await ddbDocClient.send(new PutCommand(putItemParams));
        res.json({ success: 'Documento actualizado!', id: documento.id });
    } catch (err) {
        res.status(500).json({ error: 'Could not update document: ' + err.message });
    }
});

// --- NUEVA RUTA DELETE para Borrar un documento ---
app.delete('/documentos/:id', async (req, res) => {
    const { id } = req.params;
    const deleteItemParams = {
        TableName: tableName,
        Key: { id }
    };
    try {
        await ddbDocClient.send(new DeleteCommand(deleteItemParams));
        res.json({ success: 'Documento borrado!' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete document: ' + err.message });
    }
});

app.listen(3000, function() {
    console.log("App started");
});

module.exports = app;