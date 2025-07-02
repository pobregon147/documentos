// src/App.js

import React, { useState, useEffect } from 'react';
import { Amplify, API } from 'aws-amplify'; // Asegúrate de importar API también
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Container, Button, Typography, Box } from '@mui/material';
import DocumentosTable from './components/DocumentosTable';
import RegistrarDocumento from './components/RegistrarDocumentos';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

// Configura Amplify con tu archivo de exportaciones
Amplify.configure(awsconfig);

function App({ signOut, user }) {
  // --- Esta es la lógica de useState y useEffect ---
  const [documentos, setDocumentos] = useState([]);

  // Función para cargar los documentos desde tu API
  const cargarDocumentos = async () => {
    try {
      const apiName = 'documentosDB'; // El nombre que le diste a tu API en Amplify
      const path = '/documentos';      // La ruta que configuraste
      const response = await API.get(apiName, path);
      setDocumentos(response);
    } catch (error) {
      console.error("Error al cargar documentos:", error);
    }
  };

  // useEffect se ejecuta una vez cuando el componente se carga para llamar a la función
  useEffect(() => {
    cargarDocumentos();
  }, []);
  // --- Fin de la lógica ---

  return (
    <Container maxWidth="lg"> {/* Aumenté el ancho para que quepa mejor */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <Typography variant="h4" component="h1">
          Sistema de Documentos
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
           <Typography>
            Usuario: **{user.username}**
           </Typography>
           <Button variant="outlined" onClick={signOut}>
            Cerrar sesión
           </Button>
        </Box>
      </Box>
      
      <RegistrarDocumento onDocumentoRegistrado={cargarDocumentos} />
      
      <DocumentosTable documentos={documentos} />
    </Container>
  );
}

export default withAuthenticator(App);