// src/components/DocumentosTable.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const DocumentosTable = ({ documentos }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" sx={{ p: 2 }}>
        Documentos Registrados
      </Typography>
      <Table>
        <TableHead>
          {/* El encabezado siempre se muestra igual */}
          <TableRow>
            <TableCell>N° Documento</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Año</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Asunto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Si hay documentos, los mostramos. Si no, mostramos una fila vacía. */}
          {documentos && documentos.length > 0 ? (
            documentos.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.numero_documento}</TableCell>
                <TableCell>{new Date(doc.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{doc.ano}</TableCell>
                <TableCell>{doc.usuario}</TableCell>
                <TableCell>{doc.asunto}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No hay documentos para mostrar.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentosTable;