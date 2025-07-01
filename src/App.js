import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import DocumentosTable from './components/DocumentosTable';
import RegistrarDocumento from './components/RegistrarDocumentos';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  const [documentos, setDocumentos] = useState([]);

  const cargarDocumentos = async () => {
    const response = await fetch('https://twsxytj6ya.execute-api.us-east-2.amazonaws.com/dev/');
    const data = await response.json();
    setDocumentos(data);
  };

  useEffect(() => {
    cargarDocumentos();
  }, []);

  return (
    <div className="container">
      <button onClick={signOut} className="btn-logout">Cerrar sesión</button>
      <h1>Bienvenido, {user.username}</h1>
      <RegistrarDocumento onDocumentoRegistrado={cargarDocumentos} />
      <DocumentosTable documentos={documentos} />
    </div>
  );
}

export default withAuthenticator(App);