import React, { useState } from 'react';
import { Card, Button, ListGroup, Badge, Row, Col, Form } from 'react-bootstrap';


const conceptoValidado = {
  ticket: 'TCK-1234',
  fecha: '2025-04-25',
  equipo: {
    nombre: 'CPU-001',
    tipo: 'CPU',
    marca: 'HP',
    modelo: 'EliteDesk',
    componentes: [
      { id: 1, nombre: 'Memoria RAM', tipo: 'RAM', capacidad: '8GB' },
      { id: 2, nombre: 'Disco Duro', tipo: 'HDD', capacidad: '500GB' },
    ],
  },
  diagnosticos: [
    { id: 1, descripcion: 'Memoria insuficiente', componente: 'Memoria RAM' },
    { id: 2, descripcion: 'Falla en disco duro', componente: 'Disco Duro' },
  ],
  recomendaciones: [
    { id: 1, descripcion: 'Ampliar memoria a 16GB' },
    { id: 2, descripcion: 'Reemplazar disco' },
  ],
  tipoDiagnostico: 'Repotenciar y Reasignar',
  comentarios: 'Requiere mejoras para continuar en uso.',
  observacionesCoordinador: 'Se validan las recomendaciones para repotenciación.',
};

const ApprovedConcept = ({onVolver}) => {
  const [estado, setEstado] = useState(null);
  const [observacionesJefe, setObservacionesJefe] = useState('');

  const handleAprobar = () => {
    setEstado('Aprobado');
    alert('Concepto aprobado.');
  };

  const handleDevolver = () => {
    setEstado('Devuelto al coordinador');
    alert('Concepto devuelto para correcciones.');
  };

  return (
    <div className="container mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-4 text-primary">Aprobación del Concepto Técnico</h3>

        {/* Datos del ticket */}
        <Row className="mb-3">
          <Col><strong>Ticket:</strong> {conceptoValidado.ticket}</Col>
          <Col><strong>Fecha de creación:</strong> {conceptoValidado.fecha}</Col>
        </Row>

        <hr />

        {/* Datos del equipo */}
        <h5 className="text-secondary">Información del Equipo</h5>
        <Row className="mb-2">
          <Col md={4}><strong>Nombre:</strong> {conceptoValidado.equipo.nombre}</Col>
          <Col md={4}><strong>Tipo:</strong> {conceptoValidado.equipo.tipo}</Col>
          <Col md={4}><strong>Marca/Modelo:</strong> {conceptoValidado.equipo.marca} {conceptoValidado.equipo.modelo}</Col>
        </Row>

        {/* Componentes */}
        <h6 className="mt-3">Componentes:</h6>
        <ListGroup className="mb-3">
          {conceptoValidado.equipo.componentes.map(comp => (
            <ListGroup.Item key={comp.id}>
              <Badge bg="info" className="me-2">{comp.tipo}</Badge>
              {comp.nombre} - {comp.capacidad}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <hr />

        {/* Diagnóstico */}
        <h5 className="text-secondary">Diagnóstico</h5>
        <ListGroup className="mb-3">
          {conceptoValidado.diagnosticos.map(d => (
            <ListGroup.Item key={d.id}>
              <strong>{d.componente}:</strong> {d.descripcion}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Recomendaciones */}
        <h5 className="text-secondary">Recomendaciones</h5>
        <ListGroup className="mb-3">
          {conceptoValidado.recomendaciones.map(r => (
            <ListGroup.Item key={r.id}>
              {r.descripcion}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Tipo de Concepto */}
        <Row className="mb-3">
          <Col>
            <p><strong>Tipo de Concepto:</strong> 
              <span className="badge bg-success ms-2">{conceptoValidado.tipoDiagnostico}</span>
            </p>
          </Col>
        </Row>

        <hr />


        {/* Observaciones del coordinador */}
        <h5 className="text-secondary">Observaciones del Coordinador</h5>
        <Form.Group className="mb-4">
          <Form.Control as="textarea" rows={2} value={conceptoValidado.observacionesCoordinador} readOnly />
        </Form.Group>

        {/* Observaciones del jefe */}
        <h5 className="text-secondary">Observaciones del Jefe</h5>
        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Añade tus observaciones aquí si es necesario..."
            value={observacionesJefe}
            onChange={(e) => setObservacionesJefe(e.target.value)}
          />
        </Form.Group>

        {/* Botones */}
        <div className="d-flex justify-content-end">
             <Button variant="secondary" onClick={onVolver} className="me-2">Volver</Button>
          <Button variant="danger" onClick={handleDevolver} className="me-2">Devolver</Button>
          <Button variant="success" onClick={handleAprobar}>Aprobar</Button>
        </div>

        {/* Estado Actual */}
        {estado && (
          <div className="mt-4 alert alert-info">
            <strong>Estado actual:</strong> {estado}
          </div>
        )}
      </Card>
    </div>
  );
};

export default  ApprovedConcept;
