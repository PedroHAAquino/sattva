import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css';

const Home: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        Sattva - Clínica de Estética
      </header>
      <nav>
        <Link to="/schedule" className="button">Realizar Agendamento</Link>
        <Link to="/register-professional" className="button">Cadastrar Profissional</Link>
        <Link to="/register-client" className="button">Cadastrar Cliente</Link>
        <Link to="/register-service" className="button">Cadastrar Serviço</Link>
        <Link to="/view-schedules" className="button">Visualizar Agendamentos</Link>
        <Link to="/view-services" className="button">Visualizar Serviços</Link>
        <Link to="/view-clients" className="button">Visualizar Clientes</Link>
        <Link to="/view-professionals" className="button">Visualizar Profissionais</Link>
      </nav>
      <footer className="footer">© 2024 Sattva</footer>
    </div>
  );
};

export default Home;
