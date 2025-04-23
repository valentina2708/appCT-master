
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

import StepperConcept from './components/Traceability';

function App() {
  const currentUserRole = '';

  return (
    <>
    <div className='app'>
      <StepperConcept currentUserRole={currentUserRole}/>
      </div>
  
    
    </> 
  )
}

export default App
