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
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [documentoAEditar, setDocumentoAEditar] = useState(null); // <-- Estado para el modal

  const cargarDocumentos = async () => { /* ... (sin cambios) ... */ };
  useEffect(() => { cargarDocumentos(); }, []);

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

  const documentosFiltrados = documentos.filter(doc => { /* ... (sin cambios) ... */ });

  return (
    <Container maxWidth="lg">
      {/* ... (tu cabecera y formulario de registro no cambian) ... */}
      
      {/* ... (tu campo de búsqueda y contador no cambian) ... */}
      
      {/* Pasamos las nuevas funciones a la tabla */}
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