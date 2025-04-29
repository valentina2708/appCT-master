import React, { useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import FormularioConcepto from './CreateConceptForm';

const ListConcept = ({ usuario }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [conceptos, setConceptos] = useState([
    {
      id: 1,
      consecutivo: 'CT.DA 01',
      equipo: 'CPU Dell OptiPlex',
      auxiliar: 'Pepito Perez',
      estado: 'En curso',
      fecha: '2025-04-25',
    }
  ]);

  const agregarConcepto = (nuevoConcepto) => {
    setConceptos((prev) => [...prev, { ...nuevoConcepto, id: prev.length + 1 }]);
    setMostrarModal(false);
  };

  const handleVolver = () => {
    setMostrarModal(false);
  };

  return (
    <div>
      <h4>Conceptos Técnicos Creados</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Consecutivo</th>
            <th>Equipo</th>
            <th>Auxiliar</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {conceptos.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.consecutivo}</td>
              <td>{c.equipo}</td>
              <td>{c.auxiliar}</td>
              <td>{c.fecha}</td>
              <td>{c.estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setMostrarModal(true)}>
        Crear Nuevo Concepto
      </Button>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Concepto Técnico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioConcepto onGuardar={agregarConcepto} onVolver={handleVolver} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListConcept;
