// src/components/RegistrarDocumentos.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { API } from 'aws-amplify';

const RegistrarDocumento = ({ onDocumentoRegistrado }) => {
    const hoy = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        numero_documento: '',
        fecha: hoy,
        ano: new Date().getFullYear(),
        usuario: '',
        asunto: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiName = 'documentosAPI'; // O 'documentosDB', el nombre que le hayas dado
            const path = '/documentos';
            
            // --- CAMBIO CLAVE AQUÍ ---
            // Creamos una copia de los datos y convertimos 'ano' a número
            const dataParaEnviar = {
                ...formData,
                ano: parseInt(formData.ano, 10) // Convertimos el año a número
            };

            const init = {
                body: { ...dataParaEnviar, id: Date.now().toString() }, 
                headers: {},
            };

            await API.post(apiName, path, init);

            alert('¡Documento registrado con éxito!');
            onDocumentoRegistrado();
            setFormData({
                numero_documento: '',
                fecha: hoy,
                ano: new Date().getFullYear(),
                usuario: '',
                asunto: ''
            });

        } catch (error) {
            console.error('Error al registrar el documento:', error);
            alert('Hubo un error al registrar el documento.');
        }
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Registrar Nuevo Documento
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                {/* ... (Tus otros campos de texto no cambian) ... */}
                <TextField 
                  label="Año" 
                  variant="outlined"
                  type="number" // El tipo "number" en el input ayuda a la validación en el navegador
                  value={formData.ano}
                  onChange={(e) => setFormData({...formData, ano: e.target.value})}
                  required
                />
                {/* ... (El resto de tus campos y el botón) ... */}
                 <TextField 
                  label="N° Documento" 
                  variant="outlined"
                  value={formData.numero_documento}
                  onChange={(e) => setFormData({...formData, numero_documento: e.target.value})}
                  required 
                />
                <TextField 
                  label="Fecha del Documento" 
                  type="date"
                  variant="outlined"
                  value={formData.fecha}
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  required 
                  InputLabelProps={{
                    shrink: true,
                  }}
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