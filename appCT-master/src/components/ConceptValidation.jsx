import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const conceptoDummy = {
  ticket: 'TCK-1234',
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
  fecha: '2025-04-25',
};

const RevisionCoordinador = ({ onVolver }) => {
  const [estado, setEstado] = useState(null);
  const [observaciones, setObservaciones] = useState('');

  const handleValidar = () => {
    setEstado('Validado');
    alert('Concepto validado por el coordinador.');
  };

  const handleDevolver = () => {
    setEstado('Devuelto');
    alert('Concepto devuelto al auxiliar con observaciones.');
  };

  return (
    <Card className="p-4">
      <h4>Revisión del Concepto Técnico</h4>

      <Row className="mt-3">
        <Col><strong>Ticket:</strong> {conceptoDummy.ticket}</Col>
        <Col><strong>Fecha:</strong> {conceptoDummy.fecha}</Col>
      </Row>

      <hr />

      <h5>Equipo</h5>
      <p><strong>Nombre:</strong> {conceptoDummy.equipo.nombre}</p>
      <p><strong>Tipo:</strong> {conceptoDummy.equipo.tipo}</p>
      <p><strong>Marca/Modelo:</strong> {conceptoDummy.equipo.marca} {conceptoDummy.equipo.modelo}</p>

      <h6>Componentes:</h6>
      <ul>
        {conceptoDummy.equipo.componentes.map(comp => (
          <li key={comp.id}>{comp.nombre} - {comp.capacidad}</li>
        ))}
      </ul>

      <hr />

      <h5>Diagnóstico</h5>
      <ul>
        {conceptoDummy.diagnosticos.map(d => (
          <li key={d.id}>{d.descripcion} ({d.componente})</li>
        ))}
      </ul>

      <h5>Recomendaciones</h5>
      <ul>
        {conceptoDummy.recomendaciones.map(r => (
          <li key={r.id}>{r.descripcion}</li>
        ))}
      </ul>

      <p><strong>Tipo de Concepto:</strong> {conceptoDummy.tipoDiagnostico}</p>

      <Form.Group className="mt-3">
        <Form.Label>Comentarios del auxiliar</Form.Label>
        <Form.Control as="textarea" value={conceptoDummy.comentarios} readOnly />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Observaciones del coordinador</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </Form.Group>

      <div className="mt-4">
        <Button variant="secondary" onClick={onVolver}>Volver</Button>{' '}
        <Button variant="success" onClick={handleValidar}>Validar</Button>{' '}
        <Button variant="danger" onClick={handleDevolver}>Devolver</Button>
      </div>

      {estado && (
        <div className="mt-3">
          <strong>Estado actual:</strong> {estado}
        </div>
      )}
    </Card>
  );
};

export default RevisionCoordinador;
