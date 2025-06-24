import React from 'react';

const DocumentosTable = ({ documentos }) => {
    return (
        <div className="table-container">
            <h2>Documentos Registrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>N° Documento</th>
                        <th>Fecha</th>
                        <th>Año</th>
                        <th>Usuario</th>
                        <th>Asunto</th>
                    </tr>
                </thead>
                <tbody>
                    {documentos.map((doc) => (
                        <tr key={doc.id}>
                            <td>{doc.numero_documento}</td>
                            <td>{new Date(doc.fecha).toLocaleDateString()}</td>
                            <td>{doc.año}</td>
                            <td>{doc.usuario}</td>
                            <td>{doc.asunto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentosTable;