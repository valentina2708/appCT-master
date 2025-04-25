import React, { useState } from 'react';
import RevisionCoordinador from './ConceptValidation';

const conceptosDummy = [
  {
    id: 1,
    ticket: 'TCK-001',
    equipo: {
      nombre: 'CPU-001',
      tipo: 'CPU',
      marca: 'HP',
      modelo: 'EliteDesk',
      componentes: [
        { id: 1, nombre: 'Memoria RAM', tipo: 'RAM', capacidad: '8GB' },
        { id: 2, nombre: 'Disco Duro', tipo: 'HDD', capacidad: '500GB' },
      ]
    },
    diagnosticos: [
      { id: 1, componente: 'Memoria RAM', descripcion: 'Insuficiente capacidad' },
    ],
    recomendaciones: [
      { id: 1, descripcion: 'Ampliar memoria a 16GB' }
    ],
    tipoConcepto: 'Repotenciar',
    comentarios: 'Actualizar para uso de software nuevo',
    fecha: '2025-04-25'
  },
  // Puedes agregar más conceptos aquí
];

const ListaConceptCoordinador = ({ usuario }) => {
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);

  if (conceptoSeleccionado) {
    return (
      <RevisionCoordinador
        concepto={conceptoSeleccionado}
        onVolver={() => setConceptoSeleccionado(null)}
        usuario={usuario}
      />
    );
  }

  return (
    <div>
      <h4>Conceptos para revisión</h4>
      <ul className="list-group">
        {conceptosDummy.map(concepto => (
          <li key={concepto.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{concepto.ticket}</strong> - {concepto.equipo.nombre}
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setConceptoSeleccionado(concepto)}>
              Revisar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaConceptCoordinador;
