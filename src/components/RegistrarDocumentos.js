// src/components/RegistrarDocumentos.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const RegistrarDocumento = ({ onDocumentoRegistrado, user }) => {
    const [formData, setFormData] = useState({
        numero_documento: '',
        año: new Date().getFullYear(),
        usuario: user.username, // Usamos el nombre del usuario actual
        asunto: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ... (Tu lógica para enviar el formulario sigue igual)
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Registrar Nuevo Documento
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField 
                  label="N° Documento" 
                  variant="outlined" 
                  value={formData.numero_documento}
                  onChange={(e) => setFormData({...formData, numero_documento: e.target.value})}
                  required 
                />
                {/* ... (Adapta los otros inputs de la misma forma) ... */}
                <Button type="submit" variant="contained" color="primary" size="large">
                    Registrar
                </Button>
            </Box>
        </Box>
    );
};

export default RegistrarDocumento;