import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

const ConceptValidation = ({
  data,
  onNext,
  onBack,
  onUpdateData,
  currentUserRole,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  useEffect(() => {
    if (currentUserRole === "coordinador") {
      setEditedData((prev) => ({ ...prev, estado: "Realizado" }));
    }
  }, [currentUserRole]);

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    onUpdateData(editedData);
    setEditMode(false);
  };

  const handleAprobar = () => {
    const actualizado = { ...editedData, estado: "Realizado" };
    onUpdateData(actualizado);
    onNext();
  };

  return (
    <Card className="p-4">
      <h5>Revisión del Coordinador</h5>

      <Form style={{ maxWidth: "700px" }}>
        <Form.Group>
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            name="estado"
            value={editedData.estado || "Realizado"}
            readOnly
            plaintext
            style={{ textAlign: "center", fontWeight: "bold" }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Consecutivo</Form.Label>
          <Form.Control
            name="id"
            value={editedData.id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Auxiliar</Form.Label>
              <Form.Control
                type="text"
                value={editedData.nombre_usuario}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="text"
                value={editedData.correo_usuario}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Solicitante</Form.Label>
              <Form.Control
                type="text"
                value={editedData.solicitante}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Área</Form.Label>
              <Form.Control type="text" value={editedData.area} disabled />
            </Form.Group>
          </Col>
        </Row>
        <h5 className="mt-4">Información del Equipo</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Equipo</Form.Label>
              <Form.Control
                type="text"
                name="nombre_equipo"
                value={editedData.nombre_equipo}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Serie</Form.Label>
              <Form.Control
                type="text"
                value={editedData.serial_equipo}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario Asignado</Form.Label>
              <Form.Control
                type="text"
                value={editedData.usuario_equipo}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={editedData.marca_equipo}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                value={editedData.modelo_equipo}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Componente</Form.Label>
              <Form.Select
                name="tipo_componente"
                value={editedData.tipo_componente}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="">Seleccionar</option>
                <option value="Disco duro"> Disco Duro</option>
                <option value="Memoria">Memoria RAM</option>
                <option value="Board">Board</option>
                <option value="Fuente de poder">Fuente de poder</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Diagnóstico</Form.Label>
          <Form.Control
            as="textarea"
            name="diagnostico"
            value={editedData.diagnostico}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Recomendaciones</Form.Label>
          <Form.Control
            as="textarea"
            name="recomendaciones"
            value={editedData.recomendaciones}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo de Concepto</Form.Label>
          <Form.Select
            name="tipo_concepto"
            value={editedData.tipo_concepto}
            onChange={handleChange}
            disabled={!editMode}
          >
            <option value="Dar de baja">Dar de baja</option>
            <option value="Reasignar">Reasignar</option>
            <option value="Repotenciar">Repotenciar</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Fecha</Form.Label>
          <Form.Control type="text" value={editedData.fecha} disabled />
        </Form.Group>
      </Form>

      <div className="mt-3">
        <Button variant="secondary" onClick={onBack}>
          Devolver
        </Button>{" "}
        {!editMode ? (
          <Button variant="warning" onClick={() => setEditMode(true)}>
            Editar
          </Button>
        ) : (
          <Button variant="info" onClick={saveChanges}>
            Guardar Cambios
          </Button>
        )}{" "}
        <Button variant="success" onClick={handleAprobar}>
          Validar
        </Button>
      </div>
    </Card>
  );
};

export default ConceptValidation;
