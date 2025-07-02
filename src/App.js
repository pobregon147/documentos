// src/App.js
// ... (tus importaciones)

function App({ signOut, user }) {
  // ... (tu lógica de useState y useEffect)

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h4" component="h1">
          Bienvenido, {user.username}
        </Typography>
        <Button variant="outlined" onClick={signOut}>
          Cerrar sesión
        </Button>
      </Box>
      
      {/* Ya no le pasamos el 'user' al formulario */}
      <RegistrarDocumento onDocumentoRegistrado={cargarDocumentos} />
      
      <DocumentosTable documentos={documentos} />
    </Container>
  );
}

export default withAuthenticator(App);