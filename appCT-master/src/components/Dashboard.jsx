import React from 'react';
import  ListConcept from './ListConcept';
import ListaConceptCoordinador from './ListConceptCoordinador';
// import ListaConceptosJefe from './Jefe/ListaConceptosJefe';


const usuarioActual = {
  id: 1,
  nombre: 'Valentina',
  rol: 'auxiliar', 
  area: 'Soporte Técnico'
};

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Bienvenido, {usuarioActual.nombre} ({usuarioActual.rol})</h2>
      <hr />

      {usuarioActual.rol === 'auxiliar' && <ListConcept usuario={usuarioActual} />}
      {usuarioActual.rol === 'coordinador' && <ListaConceptCoordinador usuario={usuarioActual}/>}
      {/* {usuarioActual.rol === 'jefe' && <ListaConceptosJefe usuario={usuarioActual} />} */}

    </div>
  );
};

export default Dashboard;
