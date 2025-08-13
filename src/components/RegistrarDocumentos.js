// src/components/RegistrarDocumentos.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
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
        setArchivo(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!archivo) {
            alert("Por favor, selecciona un archivo PDF.");
            return;
        }

        try {
            // 1. Subir el archivo a S3
            const nombreArchivo = `${Date.now()}-${archivo.name}`;
            const archivoSubido = await Storage.put(nombreArchivo, archivo, {
                contentType: archivo.type
            });
            const archivoKey = archivoSubido.key; // Obtenemos la "llave" del archivo en S3

            // 2. Preparar los datos para DynamoDB, incluyendo la llave del archivo
            const dataParaEnviar = {
                ...formData,
                ano: parseInt(formData.ano, 10),
                archivoPdfKey: archivoKey // <-- Nuevo campo para guardar en la BD
            };

            // 3. Guardar en DynamoDB
            const apiName = 'documentosAPI';
            const path = '/documentos';
            const init = { body: dataParaEnviar };
            await API.post(apiName, path, init);

            alert('¡Documento y archivo registrados con éxito!');
            onDocumentoRegistrado();
            // ... (limpiar formulario)
            setArchivo(null);
            e.target.reset(); // Limpia el campo del archivo
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
                <Button variant="outlined" component="label" fullWidth>
                    {archivo ? archivo.name : "Seleccionar PDF"}
                    <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
                </Button>
                
                <Button type="submit" variant="contained" color="primary" size="large">
                    Registrar
                </Button>
            </Box>
        </Box>
    );
};

export default RegistrarDocumento;