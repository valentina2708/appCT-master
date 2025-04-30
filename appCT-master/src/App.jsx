
import './App.css'
import { ConceptoProvider } from './context/ConceptoContext';
import Dashboard from './components/Dashboard';

import StepperConcept from './components/Traceability';

function App() {
  const currentUserRole = '';

  return (
    <>
    <ConceptoProvider>
    <div className='app'>
      <Dashboard/>
      </div>
    </ConceptoProvider>
    </> 
  )
}

export default App
