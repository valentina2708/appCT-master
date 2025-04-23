import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const CreateConceptForm = ({
  onNext,
  setPreviewData,
  estadoInicial,
  currentUserRole,
}) => {
  const [formData, setFormData] = useState({
    Id:"",
    nombre_usuario: "",
    correo_usuario: "",
    area_trabajo: "",
    solicitante: "",
    serial_equipo: "",
    nombre_equipo: "",
    usuario_equipo: "",
    marca_equipo: "",
    modelo_equipo: "",
    tipo_componente: "",
    diagnostico: "",
    recomendaciones: "",
    tipo_concepto: "",
    estado: estadoInicial || "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPreviewData(formData);
    onNext();
  };

  return (
    <Card className="p-4">
      {/* <h3>Crear Concepto Técnico</h3> */}
      <Form onSubmit={handleSubmit} style={{ width: "500px" }}>

        <h5 className="mt-4">Datos del Usuario</h5>
        <Row>
          <Form.Group>
            <Form.Label>Estado del Concepto</Form.Label>
            {currentUserRole === "jefe" ? (
              <Form.Select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="En Curso">Seleccionar</option>
                <option value="Validado">Validado</option>
                <option value="Aprobado">Aprobado</option>
              </Form.Select>
            ) : (
              <Form.Control
                type="text"
                name="estado"
                value={formData.estado}
                readOnly
                plaintext
                style={{textAlign:"center"}}
              />
            )}
          </Form.Group>
          <Form.Group>
              <Form.Label>Consecutivo</Form.Label>
              <Form.Control
                name="id"
                onChange={handleChange}
                required
              />
            </Form.Group>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Auxiliar</Form.Label>
              <Form.Control
                name="nombre_usuario"
                onChange={handleChange}
                required
              />
            </Form.Group>
        
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo_usuario"
                placeholder="name@example.com"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Solicitante</Form.Label>
              <Form.Control
                name="solicitante"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Área de trabajo</Form.Label>
              <Form.Control name="area" onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

       
        <h5 className="mt-4">Información del Equipo</h5>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Equipo</Form.Label>
              <Form.Control
                name="nombre_equipo"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Serie</Form.Label>
              <Form.Control
                name="serial_equipo"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Usuario asignado</Form.Label>
              <Form.Control
                name="usuario_equipo"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                name="marca_equipo"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                name="modelo_equipo"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Tipo de Componente</Form.Label>
              <Form.Select
                name="tipo_componente"
                onChange={handleChange}
                required
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

        {/* Sección 3: Diagnóstico */}
        <h5 className="mt-4">Diagnóstico</h5>
        <Form.Group>
       
          <Form.Control
            as="textarea"
            rows={3}
            name="diagnostico"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Recomendaciones</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="recomendaciones"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Tipo de Concepto</Form.Label>
          <Form.Select name="tipo_concepto" onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="Dar de baja">Dar de baja</option>
            <option value="reasignar">Reasignar</option>
            <option value="repotenciar">Repotenciar</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Crear Concepto
        </Button>
      </Form>
    </Card>
  );
};

export default CreateConceptForm;
