import React, { useState, useEffect } from 'react';
import api from './services/api';
import './style/schedule.css';

interface Professional {
  ID_Profissional: number;
  Nome: string;
}

interface Client {
  ID_Cliente: number;
  Nome: string;
}

const ScheduleForm: React.FC = () => {
  const [profissionais, setProfessionals] = useState<Professional[]>([]);
  const [clientes, setClients] = useState<Client[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    // Buscando profissionais e clientes para preencher os selects
    api.get('/profissionais').then(response => setProfessionals(response.data));
    api.get('/clientes').then(response => setClients(response.data));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post('/agendamentos', {
        ID_Profissional: selectedProfessional,
        ID_Cliente: selectedClient,
        dateTime,
      });
    } catch (error) {
      console.error('Erro ao realizar agendamento:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        Realizar Agendamento
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profissional:</label>
          <select value={selectedProfessional} onChange={(e) => setSelectedProfessional(e.target.value)}>
            {profissionais.map(professional => (
              <option key={professional.ID_Profissional} value={professional.ID_Profissional}>{professional.Nome}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cliente:</label>
          <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
            {clientes.map(client => (
              <option key={client.ID_Cliente} value={client.ID_Cliente}>{client.Nome}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Data e Hora:</label>
          <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
        </div>
        <button type="submit">Agendar</button>
      </form>
      <footer className="footer">© 2024 Sattva</footer>
    </div>
  );
};

export default ScheduleForm;
