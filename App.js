import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import DocumentosTable from './components/DocumentosTable';
import RegistrarDocumento from './components/RegistrarDocumento';
import config from './aws-exports';

Amplify.configure(config);

function App({ signOut, user }) {
  const [documentos, setDocumentos] = useState([]);
  
  const cargarDocumentos = async () => {
    const response = await fetch('https://tu-api-gateway.execute-api.region.amazonaws.com/dev/documentos');
    const data = await response.json();
    setDocumentos(data);
  };
  
  useEffect(() => {
    cargarDocumentos();
  }, []);
  
  return (
    <div className="container mt-3">
      <button onClick={signOut} className="btn btn-danger mb-3">Cerrar sesión</button>
      <h1>Bienvenido, {user.username}</h1>
      
      <RegistrarDocumento onDocumentoRegistrado={cargarDocumentos} />
      <DocumentosTable documentos={documentos} />
    </div>
  );
}

export default withAuthenticator(App);
