// src/components/DocumentosTable.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

// Ahora el componente recibe los documentos como una propiedad (prop)
const DocumentosTable = ({ documentos }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" component="h2" sx={{ p: 2 }}>
        Documentos Registrados
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>N° Documento</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Año</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Asunto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Aquí mapeamos los documentos que vienen desde App.js */}
          {documentos.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.numero_documento}</TableCell>
              <TableCell>{new Date(doc.fecha).toLocaleDateString()}</TableCell>
              <TableCell>{doc.año}</TableCell>
              <TableCell>{doc.usuario}</TableCell>
              <TableCell>{doc.asunto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentosTable;