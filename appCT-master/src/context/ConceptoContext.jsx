
import React, { createContext, useContext, useState } from 'react';

const ConceptoContext = createContext();

export const useConcepto = () => useContext(ConceptoContext);

export const ConceptoProvider = ({ children }) => {
  const [conceptos, setConceptos] = useState([]);

  const agregarConcepto = (nuevo) => {
    setConceptos((prev) => [...prev, nuevo]);
  };

  const actualizarConcepto = (id, datosActualizados) => {
    setConceptos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...datosActualizados } : c))
    );
  };

  return (
    <ConceptoContext.Provider value={{ conceptos, agregarConcepto, actualizarConcepto }}>
      {children}
    </ConceptoContext.Provider>
  );
};
