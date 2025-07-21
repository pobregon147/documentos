// src/components/EditarDocumentoModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditarDocumentoModal = ({ documento, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...documento });

  useEffect(() => {
    setFormData({ ...documento });
  }, [documento]);

  const handleSave = () => {
    onSave(formData);
  };

  if (!documento) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">Editar Documento</Typography>
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Campos del formulario para editar */}
          <TextField label="Fecha del Documento" type="date" value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} InputLabelProps={{ shrink: true }} />
          <TextField label="N° Documento" value={formData.numero_documento} onChange={(e) => setFormData({...formData, numero_documento: e.target.value})} />
          <TextField label="Año" type="number" value={formData.ano} onChange={(e) => setFormData({...formData, ano: parseInt(e.target.value)})} />
          <TextField label="Usuario" value={formData.usuario} onChange={(e) => setFormData({...formData, usuario: e.target.value})} />
          <TextField label="Asunto" multiline rows={3} value={formData.asunto} onChange={(e) => setFormData({...formData, asunto: e.target.value})} />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="text" onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleSave}>Guardar Cambios</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditarDocumentoModal;