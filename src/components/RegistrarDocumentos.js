// src/components/RegistrarDocumentos.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { API, Storage } from 'aws-amplify';

const RegistrarDocumento = ({ onDocumentoRegistrado }) => {
    const hoy = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        numero_documento: '',
        fecha: hoy,
        ano: new Date().getFullYear(),
        usuario: '',
        asunto: ''
    });
    const [archivo, setArchivo] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setArchivo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!archivo) {
            alert("Por favor, selecciona un archivo PDF.");
            return;
        }

        try {
            const nombreArchivo = `${Date.now()}-${archivo.name}`;
            const archivoSubido = await Storage.put(nombreArchivo, archivo, { contentType: 'application/pdf' });
            
            const dataParaEnviar = {
                ...formData,
                ano: parseInt(formData.ano, 10),
                archivoPdfKey: archivoSubido.key
            };

            const apiName = 'documentosAPI';
            const path = '/documentos';
            await API.post(apiName, path, { body: dataParaEnviar });

            alert('¡Documento y archivo registrados con éxito!');
            onDocumentoRegistrado();
            
            setFormData({ numero_documento: '', fecha: hoy, ano: new Date().getFullYear(), usuario: '', asunto: '' });
            setArchivo(null);
            e.target.reset();

        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Hubo un error al registrar.');
        }
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Registrar Nuevo Documento
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField fullWidth label="Año *" type="number" value={formData.ano} onChange={(e) => setFormData({...formData, ano: e.target.value})} required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField fullWidth label="N° Documento *" value={formData.numero_documento} onChange={(e) => setFormData({...formData, numero_documento: e.target.value})} required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField fullWidth label="Fecha del Documento *" type="date" value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} InputLabelProps={{ shrink: true }} required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth label="Usuario *" value={formData.usuario} onChange={(e) => setFormData({...formData, usuario: e.target.value})} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Asunto *" value={formData.asunto} onChange={(e) => setFormData({...formData, asunto: e.target.value})} required />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" component="label" fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none', color: archivo ? 'inherit' : 'grey' }}>
                            {archivo ? `Archivo seleccionado: ${archivo.name}` : "Seleccionar Archivo PDF *"}
                            <input type="file" accept="application/pdf" hidden onChange={handleFileChange} required />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" size="large">
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default RegistrarDocumento;