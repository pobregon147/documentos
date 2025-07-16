// src/components/RegistrarDocumentos.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { API } from 'aws-amplify';

const RegistrarDocumento = ({ onDocumentoRegistrado }) => {
    // Obtenemos la fecha de hoy en formato YYYY-MM-DD para el valor por defecto
    const hoy = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        numero_documento: '',
        año: '',
        usuario: '',
        asunto: '',
        fecha: hoy // <-- Añadimos el campo fecha aquí
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiName = 'documentosDB'; // Asegúrate que este sea el nombre correcto de tu API
            const path = '/documentos';
            
            const init = {
                body: {
                    ...formData,
                    id: Date.now().toString(), // Generamos el ID aquí
                }, 
                headers: {},
            };

            await API.post(apiName, path, init);

            alert('¡Documento registrado con éxito!');
            onDocumentoRegistrado(); 
            // Limpiamos el formulario para el siguiente registro
            setFormData({
                numero_documento: '',
                año: '',
                usuario: '',
                asunto: '',
                fecha: hoy 
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
                
                {/* --- NUEVO CAMPO DE FECHA --- */}
                <TextField 
                  label="Fecha del Documento" 
                  type="date" // Esto crea un selector de fecha
                  variant="outlined"
                  value={formData.fecha}
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  required 
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

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