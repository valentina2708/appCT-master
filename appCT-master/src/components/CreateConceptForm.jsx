import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

// Datos de prueba
const data = [
  {
    id: 1,
    nombre: 'CPU-001',
    tipo: 'CPU',
    marca: 'HP',
    modelo: 'EliteDesk',
    componentes: [
      { id: 1, nombre: 'Memoria RAM', tipo: 'RAM', capacidad: '8GB' },
      { id: 2, nombre: 'Disco Duro', tipo: 'HDD', capacidad: '500GB' },
    ],
  },
  {
    id: 2,
    nombre: 'Monitor-001',
    tipo: 'Monitor',
    marca: 'Dell',
    modelo: 'P2419H',
    componentes: [],
  },
];


const diagnosisByComponent = {
  RAM: [
    { id: 1, descripcion: 'Memoria insuficiente' },
    { id: 2, descripcion: 'Error de lectura de memoria' },
  ],
  HDD: [
    { id: 3, descripcion: 'Sectores dañados en el disco duro' },
    { id: 4, descripcion: 'Disco muy lento' },
  ],
  BOARD: [
    { id: 5, descripcion: 'Falla en la placa madre' },
    { id: 6, descripcion: 'Conectores dañados' },
  ],
  Monitor: [
    { id: 7, descripcion: 'Pantalla rota' },
    { id: 8, descripcion: 'Problemas de brillo o color' },
  ],
};


const recommendationByDiagnosis = {
  1: 'Ampliar memoria RAM',
  2: 'Reemplazar módulo de memoria',
  3: 'Cambiar disco duro',
  4: 'Actualizar disco por uno SSD',
  5: 'Reemplazar la board',
  6: 'Reparar conectores',
  7: 'Dar de baja monitor',
  8: 'Revisar circuito de imagen',
};

const FormularioConcepto = ({ onVolver, onGuardar }) => {
  const [usuario, setUsuario] = useState('');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [diagnosticosPorComponente, setDiagnosticosPorComponente] = useState({});
  const [tipoConcepto, setTipoConcepto] = useState('');

  const handleEquipoChange = (e) => {
    const id = parseInt(e.target.value);
    const equipo = data.find((eq) => eq.id === id);
    setEquipoSeleccionado(equipo);
    setDiagnosticosPorComponente({});
    setTipoConcepto('');
  };

  const handleDiagnosticoToggle = (componenteId, diagnosticoId) => {
    const diagnosticosActuales = diagnosticosPorComponente[componenteId] || [];
    const nuevosDiagnosticos = diagnosticosActuales.includes(diagnosticoId)
      ? diagnosticosActuales.filter((d) => d !== diagnosticoId)
      : [...diagnosticosActuales, diagnosticoId];

    setDiagnosticosPorComponente({
      ...diagnosticosPorComponente,
      [componenteId]: nuevosDiagnosticos,
    });

    determinarTipoConcepto({ ...diagnosticosPorComponente, [componenteId]: nuevosDiagnosticos });
  };

  const determinarTipoConcepto = (diagnosticos) => {
    const todos = Object.values(diagnosticos).flat();
    if (todos.includes(7) || todos.includes(3)) {
      setTipoConcepto('Dar de baja');
    } else if (todos.length >= 2) {
      setTipoConcepto('Repotenciar y Reasignar');
    } else if (todos.length === 1) {
      setTipoConcepto('Repotenciar');
    } else {
      setTipoConcepto('Reasignar');
    }
  };

  const obtenerRecomendaciones = () => {
    const todos = Object.values(diagnosticosPorComponente).flat();
    return todos.map((id) => ({
      id,
      descripcion: recommendationByDiagnosis[id],
    }));
  };

  const generarTicket = () => {
    const random = Math.floor(Math.random() * 900) + 100;
    return `TCK-${random}`;
  };

  const handleGuardar = () => {
    if (!equipoSeleccionado || !usuario || !tipoConcepto) {
      alert('Debe completar todos los campos.');
      return;
    }

    const nuevoConcepto = {
      ticket: generarTicket(),
      equipo: `${equipoSeleccionado.nombre} - ${equipoSeleccionado.marca} ${equipoSeleccionado.modelo}`,
      estado: 'En curso',
      fecha: new Date().toISOString().split('T')[0], 
      usuario: usuario,
      diagnosticos: diagnosticosPorComponente,
      recomendaciones: obtenerRecomendaciones(),
      tipoConcepto: tipoConcepto,
    };

   
    onGuardar(nuevoConcepto);

    setUsuario('');
    setEquipoSeleccionado(null);
    setDiagnosticosPorComponente({});
    setTipoConcepto('');
  };

  return (
    <Card className="p-4">
      <h5 className="mb-3">Formulario de Concepto Técnico</h5>
      <Form>
        {/* Información de usuario */}
        <Form.Group className="mb-3">
          <Form.Label>Seleccionar Usuario</Form.Label>
          <Form.Select></Form.Select>
          <Form.Control
            type="text"
            placeholder="Ingrese nombre del usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </Form.Group>

        {/* Selección de equipo */}
        <Form.Group className="mb-3">
          <Form.Label>Seleccionar equipo</Form.Label>
          <Form.Select onChange={handleEquipoChange} value={equipoSeleccionado?.id || ''}>
            <option value="">Seleccione un equipo</option>
            {data.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre} - {eq.marca} {eq.modelo}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {equipoSeleccionado && (
          <>
            {equipoSeleccionado.componentes.length > 0 ? (
              equipoSeleccionado.componentes.map((comp) => (
                <Card key={comp.id} className="p-3 mb-3 bg-light">
                  <strong>Componente: {comp.nombre} ({comp.capacidad})</strong>
                  <Row className="mt-2">
                    {(diagnosisByComponent[comp.tipo] || []).map((d) => (
                      <Col md={6} key={d.id}>
                        <Form.Check
                          label={d.descripcion}
                          checked={diagnosticosPorComponente[comp.id]?.includes(d.id) || false}
                          onChange={() => handleDiagnosticoToggle(comp.id, d.id)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card>
              ))
            ) : (
              <Card className="p-3 mb-3 bg-light">
                <strong>Este equipo no tiene componentes listados.</strong>
                {(diagnosisByComponent[equipoSeleccionado.tipo] || []).map((d) => (
                  <Form.Check
                    key={d.id}
                    label={d.descripcion}
                    checked={diagnosticosPorComponente['equipo']?.includes(d.id) || false}
                    onChange={() => handleDiagnosticoToggle('equipo', d.id)}
                  />
                ))}
              </Card>
            )}
          </>
        )}


        <Form.Group className="mb-3">
          <Form.Label>Tipo de Concepto Técnico</Form.Label>
          <Form.Control value={tipoConcepto} readOnly />
        </Form.Group>

     
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={onVolver}>
            Regresar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            Guardar Concepto
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormularioConcepto;
