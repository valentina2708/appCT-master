import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ApprovalForm = ({ data, onBack, onUpdateData }) => {
  const contentRef = useRef();
  const [editedData, setEditedData] = useState({ ...data });

  useEffect(() => {
    setEditedData((prev) => ({ ...prev, estado: "Validado" }));
  }, []);

  const handleAprobar = () => {
    alert(`Concepto ${editedData.estado} por el jefe ✅`);
    if (onUpdateData) {
      onUpdateData(editedData);
    }
  };

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("concepto_tecnico.pdf");
  };

  return (
    <Card className="p-4" style={{ width: "650px" }}>
      <div ref={contentRef}>
      <h5>Aprobación Final del Jefe</h5>
        <p>
          <strong>Estado:</strong> {editedData.estado}
        </p>


        <Row className="mb-3">
          <strong>Consecutivo:</strong> {data.id}
          <Col md={6}>
            <strong>Auxiliar:</strong> {data.nombre_usuario}
          </Col>
          <Col md={6}>
            <strong>Correo:</strong> {data.correo_usuario}
          </Col>
          <Col md={6}>
            <strong>Solicitante:</strong> {data.solicitante}
          </Col>
          <Col md={6}>
            <strong>Área:</strong> {data.area}
          </Col>
        </Row>
        <Row className="p-4">
          <Col md={6}>
            <strong>Equipo:</strong> {data.nombre_equipo}
          </Col>
          <Col md={6}>
            <strong>Usuario Asignado:</strong> {data.usuario_equipo}
          </Col>
          <Col md={6}>
            <strong>Serie:</strong> {data.serial_equipo}
          </Col>
          <Col md={6}>
            <p>
              <strong>Marca:</strong> {data.marca_equipo}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Modelo:</strong> {data.modelo_equipo}
            </p>
          </Col>
        </Row>
        <h5>Diagnóstico</h5>
       
        <p>
          <strong>Diagnóstico:</strong> {data.diagnostico}
        </p>
        <p>
          <strong>Recomendaciones:</strong> {data.diagnostico}
        </p>
        <p>
          <strong>Tipo de Concepto:</strong> {data.tipo_concepto}
        </p>
        <p>
          <strong>Fecha:</strong> {data.fecha}
        </p>
      </div>

      <div className="mt-3">
        <Button variant="secondary" onClick={onBack}>
          Devolver
        </Button>{" "}
        <Button variant="success" onClick={handleAprobar}>
          Aprobar Concepto
        </Button>{" "}
        <Button variant="outline-primary" onClick={handleDownloadPDF}>
          Descargar PDF
        </Button>
      </div>
    </Card>
  );
};

export default ApprovalForm;
