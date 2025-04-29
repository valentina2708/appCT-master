import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const usuarios = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "Laura Gómez" },
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
  HDD: ["Disco mecánico", "Disco insuficiente", "Disco dañado"],
  CPU: ["Obsolescencia de procesador"],
  BOARD: ["Daño en board"],
  Monitor: ["Pantalla dañada", "Fallas de color"],
};

const recomendacionesPorNovedad = {
  "Memoria insuficiente": [
    "Cambio de RAM de 4GB a 8GB",
    "Adición de 4GB de RAM",
  ],
  "Disco mecánico": ["Cambio a SSD 512GB", "Cambio a SSD 1TB"],
  "Disco insuficiente": ["Ampliación de disco duro"],
  "Disco dañado": ["Reemplazo de disco duro"],
  "Daño en board": ["Dar de baja equipo"],
  "Obsolescencia de procesador": ["Dar de baja por obsolescencia"],
  "Pantalla dañada": ["Dar de baja monitor"],
  "Fallas de color": ["Reparación de panel"],
  "Funciona": ["componetes buenos"],
};

const FormularioConcepto = ({ onGuardar, onVolver }) => {
  const [usuarioSolicitante, setUsuarioSolicitante] = useState("");
  const [usuarioEncargado, setUsuarioEncargado] = useState("");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [novedadesSeleccionadas, setNovedadesSeleccionadas] = useState({});
  const [recomendacionesSeleccionadas, setRecomendacionesSeleccionadas] =
    useState({});
  const [tipoConcepto, setTipoConcepto] = useState("");

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
    const isSelected = novedadesSeleccionadas[componenteId] === novedad;
    const nuevasNovedades = { ...novedadesSeleccionadas };

    if (isSelected) {
      delete nuevasNovedades[componenteId];
    } else {
      nuevasNovedades[componenteId] = novedad;
    }

    setNovedadesSeleccionadas(nuevasNovedades);
    setRecomendacionesSeleccionadas({});
    determinarTipo(nuevasNovedades);
  };

  const handleRecomendacionChange = (componenteId, recomendacion) => {
    setRecomendacionesSeleccionadas({
      ...recomendacionesSeleccionadas,
      [componenteId]: recomendacion,
    });
  };

  const determinarTipo = (novedadesActuales) => {
    const todasNovedades = Object.values(novedadesActuales);

    if (todasNovedades.some((n) => esNovedadGrave(n))) {
      setTipoConcepto("Dar de baja");
    } else if (
      todasNovedades.some((n) => n.includes("Memoria") || n.includes("Disco"))
    ) {
      setTipoConcepto("Repotenciar");
    } else if (todasNovedades.length === 0) {
      setTipoConcepto("");
    } else {
      setTipoConcepto("Reasignar");
    }
  };

  const handleGuardar = () => {
    const nuevoConcepto = {
      ticket: `TCK-${Math.floor(Math.random() * 900 + 100)}`,
      equipo: equipoSeleccionado?.nombre,
      fecha: new Date().toISOString().split("T")[0],
      estado: "En curso",
    };
    onGuardar(nuevoConcepto);
  };

  const existeNovedadGrave = Object.values(novedadesSeleccionadas).some((n) =>
    esNovedadGrave(n)
  );
  const existeNovedadMenor = Object.values(novedadesSeleccionadas).some(
    (n) => !esNovedadGrave(n)
  );

  return (
    <Card className="p-4">
      <h5 className="mb-3">Formulario de Concepto Técnico</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Usuario Solicitante</Form.Label>
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

        <Form.Group className="mb-3">
          <Form.Label>Usuario Encargado</Form.Label>
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

        <Form.Group className="mb-3">
          <Form.Label>Seleccionar equipo</Form.Label>
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

            <Form.Group className="mb-3">
              <Form.Label>Novedades Encontradas</Form.Label>
              {equipoSeleccionado.componentes.length > 0 ? (
                equipoSeleccionado.componentes.map((comp) => (
                  <div key={comp.id} className="mb-3">
                    <strong>{comp.nombre}:</strong>
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
                        />
                      ))
                    ) : (
                      <p>No hay novedades para este componente.</p>
                    )}
                  </div>
                ))
              ) : (
                <div>
                  {novedadesPorTipo["Monitor"].map((novedad, idx) => (
                    <Form.Check
                      key={idx}
                      type="checkbox"
                      label={novedad}
                      checked={novedadesSeleccionadas[idx] === novedad}
                      disabled={
                        (existeNovedadGrave && !esNovedadGrave(novedad)) ||
                        (existeNovedadMenor && esNovedadGrave(novedad))
                      }
                      onChange={() => handleNovedadChange(idx, novedad)}
                    />
                  ))}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Recomendaciones</Form.Label>
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
                      />
                    ))}
                  </div>
                )
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Concepto</Form.Label>
              <div>
                {tipoConcepto ? (
                  <span
                    className={`badge bg-${
                      tipoConcepto === "Dar de baja"
                        ? "danger"
                        : tipoConcepto === "Repotenciar"
                        ? "primary"
                        : "success"
                    }`}
                  >
                    {tipoConcepto}
                  </span>
                ) : (
                  <span className="badge bg-secondary">Sin determinar</span>
                )}
              </div>
            </Form.Group>
          </>
        )}

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
