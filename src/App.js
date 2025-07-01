// src/App.js

import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Container, Button, Typography, Box } from '@mui/material'; // Importa componentes de MUI
import DocumentosTable from './components/DocumentosTable';
import RegistrarDocumento from './components/RegistrarDocumentos';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  const [documentos, setDocumentos] = useState([]);

  const cargarDocumentos = async () => {
    // ... tu función para cargar documentos sigue igual ...
  };

  useEffect(() => {
    cargarDocumentos();
  }, []);

  return (
    // Usa el Container de MUI para centrar todo
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h4" component="h1">
          Bienvenido, {user.username}
        </Typography>
        <Button variant="outlined" onClick={signOut}>
          Cerrar sesión
        </Button>
      </Box>
      
      {/* Pasamos el usuario al componente del formulario */}
      <RegistrarDocumento onDocumentoRegistrado={cargarDocumentos} user={user} />
      
      {/* Pasamos la lista de documentos a la tabla */}
      <DocumentosTable documentos={documentos} />
    </Container>
  );
}

export default withAuthenticator(App);