import React, { useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import  ApprovedConcept from './ApprovedConcept'; 


const conceptosValidadosDummy = [
  {
    id: 1,
    ticket: 'TCK-1234',
    fecha: '2025-04-25',
    equipo: 'CPU-001',
    tipoDiagnostico: 'Repotenciar',
    estado: 'Validado'
  },
  {
    id: 2,
    ticket: 'TCK-5678',
    fecha: '2025-04-26',
    equipo: 'CPU-002',
    tipoDiagnostico: 'Dar de baja',
    estado: 'Validado'
  }
];

const ListConceptBoss = () => {
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);

  const handleSeleccionar = (concepto) => {
    setConceptoSeleccionado(concepto);
  };

  const handleVolver = () => {
    setConceptoSeleccionado(null);
  };

  return (
    <div className="container mt-4">
      {!conceptoSeleccionado ? (
        <Card className="shadow p-4">
          <h3 className="mb-4 text-primary">Conceptos Técnicos Validados (Coordinador)</h3>
          
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Fecha</th>
                <th>Equipo</th>
                <th>Tipo de Diagnóstico</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {conceptosValidadosDummy.map(concepto => (
                <tr key={concepto.id}>
                  <td>{concepto.ticket}</td>
                  <td>{concepto.fecha}</td>
                  <td>{concepto.equipo}</td>
                  <td>{concepto.tipoDiagnostico}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSeleccionar(concepto)}
                    >
                      Revisar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      ) : (
        <ApprovedConcept concepto={conceptoSeleccionado} onVolver={handleVolver} />
      )}
    </div>
  );
};

export default ListConceptBoss;
