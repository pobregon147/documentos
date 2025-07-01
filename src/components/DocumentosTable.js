// 1. Primero, importa los componentes de MUI que vas a usar
import React from 'react';
import { Container, TextField, Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function DocumentosTable() {
  // Aquí iría tu lógica (useState, etc.)

  return (
    // Container centra y da un margen agradable a tu contenido
    <Container maxWidth="md">
      
      {/* SECCIÓN DE BIENVENIDA */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Bienvenido, ttpaoctt147
      </Typography>

      {/* SECCIÓN DEL FORMULARIO */}
      <Typography variant="h5" component="h2" gutterBottom>
        Registrar Nuevo Documento
      </Typography>
      
      {/* Box es como un <div> pero con superpoderes para dar estilos y espaciado */}
      <Box component="form" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <TextField label="N° Documento" variant="outlined" />
        <TextField label="Año" defaultValue="2025" variant="outlined" />
        <TextField label="Usuario" variant="outlined" />
        <TextField label="Asunto" variant="outlined" />
        <Button variant="contained" color="primary" size="large">
          Registrar
        </Button>
      </Box>

      {/* SECCIÓN DE LA TABLA */}
      <Typography variant="h5" component="h2" gutterBottom>
        Documentos Registrados
      </Typography>

      {/* TableContainer y Paper le dan un fondo y borde a la tabla */}
      <TableContainer component={Paper}>
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
            {/* Aquí es donde mapearías tus datos. Este es un ejemplo: */}
            <TableRow>
              <TableCell>001</TableCell>
              <TableCell>01/07/2025</TableCell>
              <TableCell>2025</TableCell>
              <TableCell>ttpaoctt147</TableCell>
              <TableCell>Ejemplo de Asunto</TableCell>
            </TableRow>
            {/* Agrega más filas de ejemplo si quieres */}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  );
}

export default DocumentosTable;