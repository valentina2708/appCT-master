import { useState } from 'react';
import { Card, Button, Form, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { useConcepto } from '../context/ConceptoContext';

const RevisionCoordinador = ({ onVolver }) => {
  const { conceptos } = useConcepto();
  const [estado, setEstado] = useState({});
  const [observaciones, setObservaciones] = useState({});
  

  const obtenerColorTipoConcepto = (tipo) => {
    switch (tipo) {
      case 'Dar de baja':
        return 'danger';
      case 'Repotenciar':
        return 'warning';
      case 'Reasignar':
        return 'success';
      case 'Repotenciar y Reasignar':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  const handleValidar = (id) => {
    setEstado((prev) => ({ ...prev, [id]: 'Validado' }));
    alert(`Concepto ${id} validado por el coordinador.`);
  };

  const handleDevolver = (id) => {
    setEstado((prev) => ({ ...prev, [id]: 'Devuelto' }));
    alert(`Concepto ${id} devuelto al auxiliar con observaciones.`);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary">Revisión de Conceptos Técnicos</h3>

      {conceptos.length === 0 ? (
        <p className="text-muted">No hay conceptos técnicos para revisar.</p>
      ) : (
        conceptos.map((concepto) => (
          <Card className="shadow p-4 mb-4" key={concepto.id}>
            {/* Datos Generales */}
            <Row className="mb-3">
              <Col><strong>Consecutivo:</strong> {concepto.ticket}</Col>
              <Col><strong>Fecha de creación:</strong> {concepto.fecha}</Col>
            </Row>

            {/* Información del Equipo */}
            <h5 className="text-secondary">Información del Equipo</h5>
            <Row className="mb-2">
              <Col md={4}><strong>Nombre:</strong> {concepto.equipo.nombre}</Col>
              <Col md={4}><strong>Tipo:</strong> {concepto.equipo.tipo}</Col>
              <Col md={4}><strong>Marca/Modelo:</strong> {concepto.equipo.marca} {concepto.equipo.modelo}</Col>
            </Row>

            {/* Componentes */}
            <h6 className="mt-3">Componentes del Equipo:</h6>
            {concepto?.equipo?.componentes?.length > 0 ? (
              <ListGroup className="mb-3">
                {concepto.equipo.componentes.map((comp) => (
                  <ListGroup.Item key={comp.id}>
                    <Badge bg="info" className="me-2">{comp.tipo}</Badge>
                    {comp.nombre} - {comp.capacidad}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted">Este equipo no tiene componentes listados.</p>
            )}

            {/* Diagnóstico */}
            <h5 className="text-secondary">Novedades Encontradas</h5>
            {concepto?.diagnosticos?.length > 0 ? (
              <ListGroup className="mb-3">
                {concepto.diagnosticos.map((d) => (
                  <ListGroup.Item key={d.id}>
                    <strong>{d.componente}:</strong> {d.descripcion}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted">No se registraron novedades.</p>
            )}

            {/* Recomendaciones */}
            <h5 className="text-secondary">Recomendaciones</h5>
            {concepto?.recomendaciones?.length > 0 ? (
              <ListGroup className="mb-3">
                {concepto.recomendaciones.map((r) => (
                  <ListGroup.Item key={r.id}>{r.descripcion}</ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted">No se registraron recomendaciones.</p>
            )}

            {/* Tipo de concepto */}
            <Row className="mb-3">
              <Col>
                <strong>Tipo de Concepto:</strong>{' '}
                <Badge bg={obtenerColorTipoConcepto(concepto.tipoConcepto)} className="ms-2">
                  {concepto.tipoConcepto}
                </Badge>
              </Col>
            </Row>

            {/* Observaciones */}
            <h5 className="text-secondary">Observaciones del Coordinador</h5>
            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe tus observaciones aquí..."
                value={observaciones[concepto.id] || ''}
                onChange={(e) =>
                  setObservaciones((prev) => ({
                    ...prev,
                    [concepto.id]: e.target.value
                  }))
                }
              />
            </Form.Group>

            {/* Botones de acción */}
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={onVolver} className="me-2">Volver</Button>
              <Button variant="danger" onClick={() => handleDevolver(concepto.id)} className="me-2">
                Devolver
              </Button>
              <Button variant="success" onClick={() => handleValidar(concepto.id)}>
                Validar
              </Button>
            </div>

            {/* Estado actual */}
            {estado[concepto.id] && (
              <div className="mt-4 alert alert-info">
                <strong>Estado actual:</strong> {estado[concepto.id]}
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
};

export default RevisionCoordinador;
