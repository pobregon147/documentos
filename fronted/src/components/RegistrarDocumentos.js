import React, { useState } from 'react';

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
            const response = await fetch('https://twsxytj6ya.execute-api.us-east-2.amazonaws.com/dev/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Documento registrado!');
                onDocumentoRegistrado();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Registrar Nuevo Documento</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="N° Documento"
                    value={formData.numero_documento}
                    onChange={(e) => setFormData({...formData, numero_documento: e.target.value})}
                    required
                />
                <input
                    type="number"
                    placeholder="Año"
                    value={formData.año}
                    onChange={(e) => setFormData({...formData, año: e.target.value})}
                    required
                />
                <input
                    type="text"
                    placeholder="Usuario"
                    value={formData.usuario}
                    onChange={(e) => setFormData({...formData, usuario: e.target.value})}
                    required
                />
                <textarea
                    placeholder="Asunto"
                    value={formData.asunto}
                    onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegistrarDocumento;