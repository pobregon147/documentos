// src/components/DocumentosTable.js

import React from 'react';
// Añade IconButton y los iconos
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// El componente ahora recibe las funciones para editar y borrar
const DocumentosTable = ({ documentos, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" sx={{ p: 2 }}>
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
            <TableCell align="right">Acciones</TableCell> {/* Nueva columna */}
          </TableRow>
        </TableHead>
        <TableBody>
          {documentos && documentos.length > 0 ? (
            documentos.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.numero_documento}</TableCell>
                <TableCell>{new Date(doc.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{doc.ano}</TableCell>
                <TableCell>{doc.usuario}</TableCell>
                <TableCell>{doc.asunto}</TableCell>
                {/* Nuevos botones */}
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(doc)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(doc.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
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