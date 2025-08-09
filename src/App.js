// src/App.js

import React, { useState, useEffect } from 'react';
import { Amplify, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Container, Button, Typography, Box, TextField } from '@mui/material';
import DocumentosTable from './components/DocumentosTable';
import RegistrarDocumento from './components/RegistrarDocumentos';
import EditarDocumentoModal from './components/EditarDocumentoModal'; // <-- Importa el modal
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  const [documentos, setDocumentos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState(''); // Nuevo estado para la búsqueda
  const [documentoAEditar, setDocumentoAEditar] = useState(null);

  const cargarDocumentos = async () => {
    try {
      const apiName = 'documentosAPI';
      const path = '/documentos';
      const response = await API.get(apiName, path);
      setDocumentos(response);
    } catch (error) {
      console.error("Error al cargar documentos:", error);
    }
  };

  useEffect(() => {
    cargarDocumentos();
  }, []);

  // --- NUEVA LÓGICA PARA BORRAR ---
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres borrar este documento?")) {
      try {
        const apiName = 'documentosAPI';
        const path = `/documentos/${id}`;
        await API.del(apiName, path);
        cargarDocumentos(); // Recarga la lista después de borrar
      } catch (error) {
        console.error("Error al borrar el documento:", error);
      }
    }
  };

  // --- NUEVA LÓGICA PARA EDITAR ---
  const handleSave = async (documentoActualizado) => {
    try {
      const apiName = 'documentosAPI';
      const path = `/documentos`; // La ruta PUT es la misma que POST en nuestro backend
      const init = { body: documentoActualizado };
      await API.put(apiName, path, init);
      setDocumentoAEditar(null); // Cierra el modal
      cargarDocumentos(); // Recarga la lista
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
  };

  // Lógica para filtrar los documentos
   const documentosFiltrados = documentos.filter(doc => {
    // Si no hay término de búsqueda, muestra todos los documentos
    if (!terminoBusqueda) {
      return true;
    }
    const textoBusqueda = terminoBusqueda.toLowerCase();
    // Aseguramos que las propiedades existan antes de buscar en ellas
    const numeroDocumento = doc.numero_documento || '';
    const usuario = doc.usuario || '';
    const asunto = doc.asunto || '';
    return (
      numeroDocumento.toLowerCase().includes(textoBusqueda) ||
      usuario.toLowerCase().includes(textoBusqueda) ||
      asunto.toLowerCase().includes(textoBusqueda)
    );
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <Typography variant="h4" component="h1">
          Sistema de Documentos.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography>Usuario: **{user.username}**</Typography>
          <Button variant="outlined" onClick={signOut}>Cerrar sesión</Button>
        </Box>
      </Box>
      
      <RegistrarDocumento onDocumentoRegistrado={cargarDocumentos} />
      
      {/* --- CAMPO DE BÚSQUEDA --- */}
      <Box sx={{ my: 2 }}>
        <TextField
          fullWidth
          label="Buscar por N° Documento, Usuario o Asunto"
          variant="outlined"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
      </Box>
      
      {/* Le pasamos los documentos ya filtrados a la tabla */}
      <DocumentosTable 
        documentos={documentosFiltrados} 
        onEdit={(doc) => setDocumentoAEditar(doc)} 
        onDelete={handleDelete} 
      />
      {/* Renderizamos el modal para editar */}
      {documentoAEditar && (
        <EditarDocumentoModal
          documento={documentoAEditar}
          open={!!documentoAEditar}
          onClose={() => setDocumentoAEditar(null)}
          onSave={handleSave}
        />
      )}
    </Container>
  );
}

export default withAuthenticator(App);