/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ScheduleForm from './components/ScheduleForm';
import ProfessionalForm from './components/ProfessionalForm';
import ClientForm from './components/ClientForm';
import ServiceForm from './components/ServiceForm';
import ViewSchedules from './components/ViewSchedules';
import ViewServices from './components/ViewServices';
import ViewClients from './components/ViewClients';
import ViewProfessionals from './components/ViewProfissionals';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schedule" element={<ScheduleForm />} />
        <Route path="/register-professional" element={<ProfessionalForm />} />
        <Route path="/register-client" element={<ClientForm />} />
        <Route path="/register-service" element={<ServiceForm />} />
        <Route path="/view-schedules" element={<ViewSchedules />} />
        <Route path="/view-services" element={<ViewServices />} />
        <Route path="/view-clients" element={<ViewClients />} />
        <Route path="/view-professionals" element={<ViewProfessionals />} />
      </Routes>
    </Router>
  );
};

export default App;*/



//Ir para home sem logar

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ScheduleForm from './components/ScheduleForm';
import ProfessionalForm from './components/ProfessionalForm';
import ClientForm from './components/ClientForm';
import ServiceForm from './components/ServiceForm';
import ViewSchedules from './components/ViewSchedules';
import ViewServices from './components/ViewServices';
import ViewClients from './components/ViewClients';
import ViewProfessionals from './components/ViewProfissionals';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<ScheduleForm />} />
        <Route path="/register-professional" element={<ProfessionalForm />} />
        <Route path="/register-client" element={<ClientForm />} />
        <Route path="/register-service" element={<ServiceForm />} />
        <Route path="/view-schedules" element={<ViewSchedules />} />
        <Route path="/view-services" element={<ViewServices />} />
        <Route path="/view-clients" element={<ViewClients />} />
        <Route path="/view-professionals" element={<ViewProfessionals />} />
      </Routes>
    </Router>
  );
};

export default App;


