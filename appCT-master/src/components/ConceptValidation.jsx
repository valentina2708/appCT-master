import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, ListGroup, Badge } from 'react-bootstrap';

const RevisionCoordinador = ({ concepto, onVolver }) => {
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
    <div className="container mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-4 text-primary">Revisión del Concepto Técnico</h3>

        {/* Datos del ticket */}
        <Row className="mb-3">
          <Col><strong>Ticket:</strong> {concepto.ticket}</Col>
          <Col><strong>Fecha de creación:</strong> {concepto.fecha}</Col>
        </Row>

        <hr />

        {/* Datos del equipo */}
        <h5 className="text-secondary">Información del Equipo</h5>
        <Row className="mb-2">
          <Col md={4}><strong>Nombre:</strong> {concepto.equipo.nombre}</Col>
          <Col md={4}><strong>Tipo:</strong> {concepto.equipo.tipo}</Col>
          <Col md={4}><strong>Marca/Modelo:</strong> {concepto.equipo.marca} {concepto.equipo.modelo}</Col>
        </Row>

        {/* Componentes */}
        <h6 className="mt-3">Componentes:</h6>
        <ListGroup className="mb-3">
          {concepto.equipo.componentes.map(comp => (
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
          {concepto.diagnosticos.map(d => (
            <ListGroup.Item key={d.id}>
              <strong>{d.componente}:</strong> {d.descripcion}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Recomendaciones */}
        <h5 className="text-secondary">Recomendaciones</h5>
        <ListGroup className="mb-3">
          {concepto.recomendaciones.map(r => (
            <ListGroup.Item key={r.id}>
              {r.descripcion}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Tipo de concepto */}
        <Row className="mb-3">
          <Col>
            <p><strong>Tipo de Concepto:</strong> 
              <span className="badge bg-success ms-2">{concepto.tipoConcepto}</span>
            </p>
          </Col>
        </Row>

        <hr />


        {/* Observaciones del coordinador */}
        <h5 className="text-secondary">Observaciones del Coordinador</h5>
        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribe tus observaciones aquí..."
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </Form.Group>

        {/* Botones de acción */}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onVolver} className="me-2">Volver</Button>
          <Button variant="danger" onClick={handleDevolver} className="me-2">Devolver</Button>
          <Button variant="success" onClick={handleValidar}>Validar</Button>
        </div>

        {/* Estado actual */}
        {estado && (
          <div className="mt-4 alert alert-info">
            <strong>Estado actual:</strong> {estado}
          </div>
        )}
      </Card>
    </div>
  );
};

export default RevisionCoordinador;
