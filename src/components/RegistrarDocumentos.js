import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
// Importa el objeto API de Amplify
import { API } from 'aws-amplify';

const RegistrarDocumento = ({ onDocumentoRegistrado }) => {
    const [formData, setFormData] = useState({
        numero_documento: '',
        año: new Date().getFullYear(),
        usuario: '',
        asunto: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiName = 'documentosDB'; // El nombre que le diste a tu API
            const path = '/documentos';      // La ruta que configuraste
            
            const init = {
                body: { // El cuerpo de la petición ya no necesita ser un string
                    ...formData,
                    id: Date.now().toString(), // Generamos el ID aquí
                    fecha: new Date().toISOString()
                }, 
                headers: {},
            };

            // Usamos API.post en lugar de fetch
            await API.post(apiName, path, init);

            alert('¡Documento registrado con éxito!');
            onDocumentoRegistrado();
            setFormData({
                numero_documento: '',
                año: new Date().getFullYear(),
                usuario: '',
                asunto: ''
            });

        } catch (error) {
            console.error('Error al registrar el documento:', error);
            alert('Hubo un error al registrar el documento. Revisa la consola para más detalles.');
        }
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Registrar Nuevo Documento
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                <TextField 
                  label="N° Documento" 
                  variant="outlined"
                  value={formData.numero_documento}
                  onChange={(e) => setFormData({...formData, numero_documento: e.target.value})}
                  required 
                />
                <TextField 
                  label="Año" 
                  variant="outlined"
                  type="number"
                  value={formData.año}
                  onChange={(e) => setFormData({...formData, año: e.target.value})}
                  required
                />
                <TextField 
                  label="Usuario" 
                  variant="outlined"
                  value={formData.usuario}
                  onChange={(e) => setFormData({...formData, usuario: e.target.value})}
                  required
                />
                <TextField 
                  label="Asunto" 
                  variant="outlined"
                  value={formData.asunto}
                  onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                  required
                  fullWidth
                  sx={{ flexGrow: 1 }}
                />
                <Button type="submit" variant="contained" color="primary" size="large">
                    Registrar
                </Button>
            </Box>
        </Box>
    );
};

export default RegistrarDocumento;