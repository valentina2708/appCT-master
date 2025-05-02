import React, { useState } from "react";
import { Form, Button, Accordion, Card, Badge } from "react-bootstrap";
import { useConcepto } from '../context/ConceptoContext';

const usuarios = [
  { id: 1, nombre: "Juan Pérez", area: "Tesoreria" },
  { id: 2, nombre: "Laura Gómez", area: "Tecnologia" },
];

const equipos = [
  {
    id: 1,
    nombre: "CPU-001",
    tipo: "CPU",
    marca: "HP",
    modelo: "EliteDesk",
    serial: "ABC12345",
    componentes: [
      { id: 1, nombre: "Memoria RAM", tipo: "RAM", detalle: "4GB DDR4" },
      { id: 2, nombre: "Disco Duro", tipo: "HDD", detalle: "500GB SATA" },
      { id: 3, nombre: "Procesador", tipo: "CPU", detalle: "Intel Core i2" },
    ],
  },
  {
    id: 2,
    nombre: "Monitor-001",
    tipo: "Monitor",
    marca: "Dell",
    modelo: "P2419H",
    serial: "MON12345",
    componentes: [],
  },
];

const novedadesPorTipo = {
  RAM: ["Memoria insuficiente"],
  HDD: ["Disco mecanico", "Disco insuficiente", "Disco dañado"],
  CPU: ["Obsolescencia de procesador", "Reasignar"],
  BOARD: ["Daño en board"],
  FUENTE_DE_PODER: ["Fuente dañada"],
  Monitor: ["Pantalla dañada", "Fallas de color", "Reasignar"],
};

const recomendacionesPorNovedad = {
  "Memoria insuficiente": [
    "Cambio de RAM de 4GB a 8GB",
    "Adición de 4GB de RAM",
  ],
  "Disco mecánico": ["Cambio de disco mecanico a disco SSD de 512GB", "Cambio de disco mecanico a disco SSD de una 1TB"],
  "Disco insuficiente": ["Ampliación de disco duro"],
  "Disco dañado": ["Reemplazo de disco duro"],
  "Daño en board": ["Dar de baja por corto en board"],
  "Obsolescencia de procesador": ["Dar de baja por obsolescencia"],
  "Pantalla dañada": ["Dar de baja monitor"],
  "Fallas de color": ["Reparación de panel"],
  "Reasignar": ["Reasignar equipo"],
};

const FormularioConcepto = ({ onGuardar, onVolver }) => {
  const { agregarConcepto } = useConcepto();
  const [usuarioSolicitante, setUsuarioSolicitante] = useState("");
  const [usuarioEncargado, setUsuarioEncargado] = useState("");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [novedadesSeleccionadas, setNovedadesSeleccionadas] = useState({});
  const [recomendacionesSeleccionadas, setRecomendacionesSeleccionadas] =
    useState({});
  const [tipoConcepto, setTipoConcepto] = useState("");
  const [comentarios, setComentarios] = useState("");

  const handleEquipoChange = (e) => {
    const id = parseInt(e.target.value);
    const equipo = equipos.find((eq) => eq.id === id);
    setEquipoSeleccionado(equipo);
    setNovedadesSeleccionadas({});
    setRecomendacionesSeleccionadas({});
    setTipoConcepto("");
  };

  const esNovedadGrave = (novedad) =>
    novedad.includes("Daño en board") ||
    novedad.includes("Obsolescencia") ||
    novedad.includes("Pantalla dañada");

    const handleNovedadChange = (componenteId, novedad) => {
      const novedadActual = novedadesSeleccionadas[componenteId];
  
      const nuevasNovedades = { ...novedadesSeleccionadas };
      if (novedadActual === novedad) {
        delete nuevasNovedades[componenteId];
      } else {
        nuevasNovedades[componenteId] = novedad;
      }
    
      setNovedadesSeleccionadas(nuevasNovedades);
    
      setRecomendacionesSeleccionadas((prev) => {
        const nuevasRecomendaciones = { ...prev };
        delete nuevasRecomendaciones[componenteId];
        return nuevasRecomendaciones;
      });
    
      determinarTipo(nuevasNovedades, recomendacionesSeleccionadas);
    };
    
  const handleRecomendacionChange = (componenteId, recomendacion) => {
    const nuevasRecomendaciones = {
      ...recomendacionesSeleccionadas,
      [componenteId]: recomendacion,
    };
    setRecomendacionesSeleccionadas(nuevasRecomendaciones);
    determinarTipo(novedadesSeleccionadas, nuevasRecomendaciones);
  };

 
  const determinarTipo = (novedadesActuales, recomendacionesActuales) => {
    const ids = Object.keys(novedadesActuales);
    const todasRecomendaciones = ids.every((id) => recomendacionesActuales[id]);
  
    if (!todasRecomendaciones) {
      setTipoConcepto("");
      return;
    }
  
    const novedades = Object.values(novedadesActuales);
    const tieneGraves = novedades.some((n) => esNovedadGrave(n));
    const tieneReasignar = novedades.some((n) => n === "Reasignar");
    const tieneRepotenciar = novedades.some(
      (n) => n.includes("Memoria") || n.includes("Disco")
    );
  
    if (tieneGraves) {
      setTipoConcepto("Dar de baja");
    } else if (tieneRepotenciar && tieneReasignar) {
      setTipoConcepto("Repotenciar y Reasignar");
    } else if (tieneRepotenciar) {
      setTipoConcepto("Repotenciar");
    } else if (tieneReasignar) {
      setTipoConcepto("Reasignar");
    } else {
      setTipoConcepto("");
    }
  };
  

  const handleGuardar = () => {
    const nuevoConcepto = {
      consecutivo: `CT.DA-${Math.floor(Math.random() * 900 + 100)}`,
      equipo: equipoSeleccionado?.nombre,
      auxiliar: usuarioEncargado,
      fecha: new Date().toISOString().split("T")[0],
      estado: "En curso",
    };
    onGuardar(nuevoConcepto);
    agregarConcepto(nuevoConcepto);
  };

  const existeNovedadGrave = Object.values(novedadesSeleccionadas).some((n) =>
    esNovedadGrave(n)
  );
  const existeNovedadMenor = Object.values(novedadesSeleccionadas).some(
    (n) => !esNovedadGrave(n)
  );

  const esNovedadIncompatible = (novedad) => {
    const todas = Object.values(novedadesSeleccionadas);
    const seleccionandoRepotencia = todas.some(n => n.includes("Memoria") || n.includes("Disco"));
    const seleccionandoBaja = todas.some(n => esNovedadGrave(n));
  
    if (seleccionandoBaja && (novedad.includes("Memoria") || novedad.includes("Disco"))) {
      return true;
    }
    if (seleccionandoRepotencia && esNovedadGrave(novedad)) {
      return true;
    }
    return false;
  };
  

  return (
    <Card className="p-4">
      <Form>
        <div className="row">
          <div className="col">
            <Form.Group className="mb-3">
              <h6 className="mb-2">Solicitante</h6>
              <Form.Select
                value={usuarioSolicitante}
                onChange={(e) => setUsuarioSolicitante(e.target.value)}
              >
                <option value="">Seleccione</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.nombre}>
                    {u.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3">
              <h6 className="mb-2">Área</h6>
              <Form.Select
                value={areaSeleccionada}
                onChange={(e) => setAreaSeleccionada(e.target.value)}
              >
                <option value="">Seleccione</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.area}>
                    {u.area}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Group className="mb-3">
              <h6 className="mb-2">Encargado</h6>
              <Form.Select
                value={usuarioEncargado}
                onChange={(e) => setUsuarioEncargado(e.target.value)}
              >
                <option value="">Seleccione</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.nombre}>
                    {u.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <h6 className="mb-2">Seleccionar equipo</h6>
          <Form.Select
            onChange={handleEquipoChange}
            value={equipoSeleccionado?.id || ""}
          >
            <option value="">Seleccione un equipo</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {equipoSeleccionado && (
          <>
            <Card className="p-3 mb-3 bg-light">
              <strong>Detalles del equipo:</strong>
              <ul>
                <li>
                  <b>Marca:</b> {equipoSeleccionado.marca}
                </li>
                <li>
                  <b>Modelo:</b> {equipoSeleccionado.modelo}
                </li>
                <li>
                  <b>Serial:</b> {equipoSeleccionado.serial}
                </li>
              </ul>

              {equipoSeleccionado.componentes.length > 0 ? (
                <>
                  <strong>Componentes:</strong>
                  <ul>
                    {equipoSeleccionado.componentes.map((comp) => (
                      <li key={comp.id}>
                        {comp.nombre} - {comp.detalle}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>Este equipo no tiene componentes listados.</p>
              )}
            </Card>

            <Form.Group className="mb-4">
          <h5 className="text-center mb-3">Novedades</h5>
          {equipoSeleccionado.componentes.length > 0 ? (
            <Accordion defaultActiveKey="0">
              {equipoSeleccionado.componentes.map((comp, idx) => (
                <Accordion.Item eventKey={idx.toString()} key={comp.id}>
                  <Accordion.Header>
                    <Badge bg="info" className="me-2">{comp.tipo}</Badge>
                    {comp.nombre}
                  </Accordion.Header>
                  <Accordion.Body>
                    {novedadesPorTipo[comp.tipo] ? (
                      novedadesPorTipo[comp.tipo].map((novedad) => (
                        <Form.Check
                          key={novedad}
                          type="checkbox"
                          label={novedad}
                          checked={novedadesSeleccionadas[comp.id] === novedad}
                          disabled={
                            (existeNovedadGrave && !esNovedadGrave(novedad)) ||
                            (existeNovedadMenor && esNovedadGrave(novedad))
                          }
                          onChange={() => handleNovedadChange(comp.id, novedad)}
                          className="mb-2"
                        />
                      ))
                    ) : (
                      <p className="text-muted">No hay novedades para este componente.</p>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <div>
              {novedadesPorTipo["Monitor"].map((novedad, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  label={novedad}
                  checked={novedadesSeleccionadas[idx] === novedad}
                  // disabled={
                  //   (existeNovedadGrave && !esNovedadGrave(novedad)) ||
                  //   (existeNovedadMenor && esNovedadGrave(novedad))
                  // }
                  onChange={() => handleNovedadChange(idx, novedad)}
                  className="mb-2"
                  disabled={esNovedadIncompatible(novedad)}

                />
              ))}
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-4">
          <h5 className=" mb-3">Recomendaciones</h5>
          {Object.entries(novedadesSeleccionadas).map(
            ([compId, novedad]) => (
              <div key={compId} className="mb-3">
                <strong>Novedad: {novedad}</strong>
                {recomendacionesPorNovedad[novedad]?.map((reco) => (
                  <Form.Check
                    key={reco}
                    type="radio"
                    name={`reco-${compId}`}
                    label={reco}
                    checked={recomendacionesSeleccionadas[compId] === reco}
                    onChange={() => handleRecomendacionChange(compId, reco)}
                    className="mb-2"
                  

                  />
                ))}
              </div>
            )
          )}
        </Form.Group>

        <Form.Group className="mb-3 text-center">
          <h5 className="mb-3"> Tipo de Concepto</h5>
          <div>
            {tipoConcepto ? (
              <Badge
                bg={
                  tipoConcepto === "Dar de baja"
                    ? "danger"
                    : tipoConcepto === "Repotenciar"
                    ? "warning"
                    : "success"
                }
                className="fs-6"
              >
                {tipoConcepto}
              </Badge>
            ) : (
              <Badge bg="secondary" className="fs-6">Sin determinar</Badge>
            )}
          </div>
        </Form.Group>
          </>
        )}

        <h5 className="text-secondary">Comentarios</h5>
        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribe tus comentarios aqui..."
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={onVolver}>
            Volver
          </Button>
          <Button
            variant="primary"
            onClick={handleGuardar}
            disabled={!tipoConcepto}
          >
            Guardar Concepto
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormularioConcepto;
