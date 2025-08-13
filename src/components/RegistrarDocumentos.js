// src/components/RegistrarDocumentos.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
// Importa 'Storage' de aws-amplify
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
    
    // Nuevo estado para guardar el archivo seleccionado
    const [archivo, setArchivo] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setArchivo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificamos que se haya seleccionado un archivo
        if (!archivo) {
            alert('Por favor, selecciona un archivo PDF para subir.');
            return;
        }

        try {
            // 1. Subimos el archivo a S3
            const nombreArchivo = `${Date.now()}-${archivo.name}`;
            const archivoSubido = await Storage.put(nombreArchivo, archivo, {
                contentType: 'application/pdf'
            });
            
            // La 'key' es el nombre con el que se guardó el archivo en S3
            const archivoKey = archivoSubido.key;

            // 2. Preparamos los datos para guardar en DynamoDB
            const dataParaEnviar = {
                ...formData,
                ano: parseInt(formData.ano, 10),
                archivoPdfKey: archivoKey // <-- Añadimos la referencia al archivo
            };

            // 3. Enviamos los datos a la API
            const apiName = 'documentosAPI';
            const path = '/documentos';
            const init = { body: dataParaEnviar };

            await API.post(apiName, path, init);

            alert('¡Documento y archivo registrados con éxito!');
            onDocumentoRegistrado(); // Actualiza la tabla
            
            // Limpiamos el formulario y el estado del archivo
            setFormData({
                numero_documento: '',
                fecha: hoy,
                ano: new Date().getFullYear(),
                usuario: '',
                asunto: ''
            });
            setArchivo(null);
            e.target.reset(); // Limpia el campo de selección de archivo

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
                {/* ... (Tus otros campos TextField no cambian) ... */}

                {/* --- NUEVO BOTÓN PARA SELECCIONAR EL PDF --- */}
                <Button variant="outlined" component="label" fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none', color: archivo ? 'inherit' : 'grey' }}>
                    {archivo ? `Archivo seleccionado: ${archivo.name}` : "Seleccionar Archivo PDF *"}
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