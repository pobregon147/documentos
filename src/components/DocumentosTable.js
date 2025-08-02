// src/components/DocumentosTable.js

import React, { useState } from 'react';
// Importa TablePagination y los iconos necesarios
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography,
    IconButton,
    TablePagination // <-- Componente para la paginación
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DocumentosTable = ({ documentos, onEdit, onDelete }) => {
  // --- NUEVA LÓGICA PARA LA PAGINACIÓN ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Puedes cambiar este número (10, 25, 50)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // --- FIN DE LA LÓGICA DE PAGINACIÓN ---

  return (
    <Paper> {/* Usamos Paper como contenedor principal */}
      <Typography variant="h5" sx={{ p: 2 }}>
        Documentos Registrados
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° Documento</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Asunto</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Ahora solo mostramos una "rebanada" (slice) de los datos */}
            {documentos && documentos.length > 0 ? (
              documentos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.numero_documento}</TableCell>
                    <TableCell>{new Date(doc.fecha).toLocaleDateString()}</TableCell>
                    <TableCell>{doc.ano}</TableCell>
                    <TableCell>{doc.usuario}</TableCell>
                    <TableCell>{doc.asunto}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => onEdit(doc)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(doc.id)} color="error">
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
      
      {/* --- COMPONENTE DE PAGINACIÓN AÑADIDO --- */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]} // Opciones de cuántas filas por página
        component="div"
        count={documentos.length} // El número total de documentos
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
      />
    </Paper>
  );
};

export default DocumentosTable;