// src/components/DocumentosTable.js

import React, { useState } from 'react';
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
    TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { Storage } from 'aws-amplify';

const DocumentosTable = ({ documentos, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownload = async (archivoKey) => {
    try {
      const url = await Storage.get(archivoKey, { expires: 120 });
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      alert('No se pudo descargar el archivo.');
    }
  };

  // --- FUNCIÓN PARA CONVERTIR LA FECHA DE EXCEL ---
  const convertirFechaExcel = (serial) => {
    // Si el valor no es un número (por ejemplo, ya es una fecha como "2025-07-20"), lo devuelve tal cual.
    if (isNaN(serial) || typeof serial !== 'number') {
      // Si es una cadena de fecha válida, la procesamos
      if (typeof serial === 'string' && serial.includes('-')) {
        return new Date(serial).toLocaleDateString();
      }
      return serial;
    }
    // Fórmula para convertir el número de serie de Excel a una fecha de JavaScript
    const fechaUTC = new Date(Date.UTC(1899, 11, 30 + parseInt(serial)));
    return fechaUTC.toLocaleDateString();
  };
  // --- FIN DE LA FUNCIÓN ---

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
            {documentos && documentos.length > 0 ? (
              documentos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.numero_documento}</TableCell>
                    {/* --- APLICAMOS LA FUNCIÓN DE CONVERSIÓN AQUÍ --- */}
                    <TableCell>{convertirFechaExcel(doc.fecha)}</TableCell>
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
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={documentos.length}
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