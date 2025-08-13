// src/components/DocumentosTable.js

import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,IconButton,TablePagination} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';

const DocumentosTable = ({ documentos, onEdit, onDelete }) => {
  // --- LÓGICA PARA LA PAGINACIÓN ---
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

  // --- FUNCIÓN PARA DESCARGAR ---
  const handleDownload = async (archivoKey) => {
    try {
      // Obtenemos una URL firmada y temporal para el archivo
      const url = await Storage.get(archivoKey, { expires: 60 }); // URL válida por 60 segundos
      window.open(url, '_blank'); // Abre el PDF en una nueva pestaña
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      alert('No se pudo descargar el archivo.');
    }
  };

  return (
    <Paper>
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
                      {doc.archivoPdfKey && (
                        <IconButton onClick={() => handleDownload(doc.archivoPdfKey)}>
                          <DownloadIcon />
                        </IconButton>
                      )}
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