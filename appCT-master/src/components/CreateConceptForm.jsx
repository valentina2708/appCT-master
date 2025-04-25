import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const equiposDummy = [
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

// Diagnóstico y recomendaciones por tipo de componente
const diagnosticosPorComponente = {
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
};

const recomendacionesPorDiagnostico = {
  1: 'Ampliar memoria RAM',
  2: 'Reemplazar módulo de memoria',
  3: 'Cambiar disco duro',
  4: 'Actualizar disco por uno SSD',
  5: 'Reemplazar la board',
  6: 'Reparar conectores',
};

const FormularioConcepto = ({ onVolver }) => {
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [diagnosticosSeleccionados, setDiagnosticosSeleccionados] = useState([]);
  const [tipoConcepto, setTipoConcepto] = useState('');

  const handleEquipoChange = (e) => {
    const id = parseInt(e.target.value);
    const equipo = equiposDummy.find((eq) => eq.id === id);
    setEquipoSeleccionado(equipo);
    setDiagnosticosSeleccionados([]);
    setTipoConcepto('');
  };

  const obtenerDiagnosticos = () => {
    if (!equipoSeleccionado || equipoSeleccionado.tipo !== 'CPU') return [];
    const tipos = equipoSeleccionado.componentes.map((c) => c.tipo);
    const diag = tipos.flatMap((tipo) => diagnosticosPorComponente[tipo] || []);
    return diag.slice(0, 3); // solo 3 ítems
  };

  const handleDiagnosticoToggle = (id) => {
    const nuevoDiagnostico = diagnosticosSeleccionados.includes(id)
      ? diagnosticosSeleccionados.filter((d) => d !== id)
      : [...diagnosticosSeleccionados, id];
    setDiagnosticosSeleccionados(nuevoDiagnostico);
    determinarTipo(nuevoDiagnostico);
  };

  const determinarTipo = (diagnosticos) => {
    if (diagnosticos.length >= 2) setTipoConcepto('Repotenciar y Reasignar');
    else if (diagnosticos.includes(3)) setTipoConcepto('Dar de baja');
    else if (diagnosticos.includes(1)) setTipoConcepto('Repotenciar');
    else setTipoConcepto('Reasignar');
  };

  const obtenerRecomendaciones = () => {
    return diagnosticosSeleccionados.map((id) => ({
      id,
      descripcion: recomendacionesPorDiagnostico[id],
    }));
  };

  const handleGuardar = () => {
    alert(`Concepto guardado para equipo ${equipoSeleccionado?.nombre}\nTipo: ${tipoConcepto}`);
  };

  return (
    <Card className="p-4">
      <h5 className="mb-3">Formulario de Concepto Técnico</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Seleccionar equipo</Form.Label>
          <Form.Select onChange={handleEquipoChange} value={equipoSeleccionado?.id || ''}>
            <option value="">Seleccione un equipo</option>
            {equiposDummy.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre} - {eq.marca} {eq.modelo}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {equipoSeleccionado?.tipo === 'CPU' && (
          <Card className="p-3 mb-3 bg-light">
            <strong>Componentes del equipo:</strong>
            <ul className="mb-0">
              {equipoSeleccionado.componentes.map((c) => (
                <li key={c.id}>
                  {c.nombre} - {c.capacidad}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {equipoSeleccionado && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Diagnóstico</Form.Label>
              <Row>
                {obtenerDiagnosticos().map((d) => (
                  <Col md={4} key={d.id}>
                    <Form.Check
                      label={d.descripcion}
                      checked={diagnosticosSeleccionados.includes(d.id)}
                      onChange={() => handleDiagnosticoToggle(d.id)}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>

            {diagnosticosSeleccionados.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Recomendaciones</Form.Label>
                <Row>
                  {obtenerRecomendaciones().map((r) => (
                    <Col md={4} key={r.id}>
                      <Form.Control plaintext readOnly defaultValue={`- ${r.descripcion}`} />
                    </Col>
                  ))}
                </Row>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Concepto</Form.Label>
              <Form.Control value={tipoConcepto} readOnly />
            </Form.Group>
          </>
        )}

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={onVolver}>
            Volver
          </Button>
          <Button variant="primary" onClick={handleGuardar} disabled={!tipoConcepto}>
            Guardar Concepto
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormularioConcepto;
