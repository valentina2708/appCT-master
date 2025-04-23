import React, { useState } from 'react';
import CreateConceptForm from './CreateConceptForm';
import ConceptValidation from './ConceptValidation';
import ApprovalForm from './ApprovedConcept';
import { Container, ProgressBar } from 'react-bootstrap';

const StepperConcept = ({currentUserRole}) => {
  const [step, setStep] = useState(1);
  const [previewData, setPreviewData] = useState(null); 

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const updatePreviewData = (newData) => {
    setPreviewData(newData);  
  };

  const getStateByRole = (rol) => {
    switch (rol) {
      case 'auxiliar':
        return 'En curso';
      case 'coordinador':
        return 'Realizado';
      case 'jefe':
        return 'Validado';
      default:
        return '';
    }
  };
  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CreateConceptForm
            onNext={nextStep}
            setPreviewData={setPreviewData} 
            estadoInicial= {getStateByRole(currentUserRole)}
            currentUserRole={currentUserRole}
          />
        );
      case 2:
        return (
          <ConceptValidation
            data={previewData}
            onNext={nextStep}
            onBack={prevStep}
            onUpdateData={updatePreviewData}
              currentUserRole="coordinador"
          />
        );
      case 3:
        return (
        <ApprovalForm
        data={previewData} 
        onBack={prevStep}
        onUpdateData={updatePreviewData}
      />
      );
      default:
        return <p>Proceso finalizado.</p>;
    }
  };

  return (
    <Container className="mt-4">
      <h4>Creación de Concepto Técnico</h4>
      <ProgressBar now={(step / 3) * 100} className="mb-3" />
      {renderStep()}
    </Container>
  );
};

export default StepperConcept;
