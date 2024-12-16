import React, { useState, useEffect } from 'react';
import api from './services/api';
import './style/view.css';

interface Schedule {
  ID_Agendamento: number;
  NomeProfissinal: string;
  NomeCliente: string;
  dateTime: string;
  Descricao: string;
  Duracao: string;
}

const ViewSchedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await api.get('/agendamentos');
      setSchedules(response.data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/agendamentos/${id}`);
      setSchedules(schedules.filter(schedule => schedule.ID_Agendamento !== id));
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
  };

  const handleSaveEdit = async () => {
    if (editingSchedule) {
      try {
        await api.put(`/agendamentos/${editingSchedule.ID_Agendamento}`, editingSchedule);
        setEditingSchedule(null);
        fetchSchedules(); // Atualizar a lista de agendamentos
      } catch (error) {
        console.error('Erro ao salvar agendamento:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingSchedule) {
      const { name, value } = e.target;
      setEditingSchedule({ ...editingSchedule, [name]: value });
    }
  };

  return (
    <div className="container">
      <header className="header">Visualizar Agendamentos</header>

      {schedules.map(schedule => (
        <div key={schedule.ID_Agendamento} className="item">
          <h3>Agendamento #{schedule.ID_Agendamento}</h3>
          <p><strong>Profissional:</strong> {schedule.NomeProfissinal}</p>
          <p><strong>Cliente:</strong> {schedule.NomeCliente}</p>
          <p><strong>Data e Hora:</strong> {new Date(schedule.dateTime).toLocaleString()}</p>
          <p><strong>Descrição:</strong> {schedule.Descricao}</p>
          <p><strong>Duração:</strong> {schedule.Duracao}</p>
          <button onClick={() => handleEdit(schedule)}>Editar</button>
          <button onClick={() => handleDelete(schedule.ID_Agendamento)}>Excluir</button>
        </div>
      ))}

      {editingSchedule && (
        <div className="edit-modal">
          <h3>Editando Agendamento #{editingSchedule.ID_Agendamento}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Profissional:
              <input
                type="text"
                name="NomeProfissinal"
                value={editingSchedule.NomeProfissinal}
                onChange={handleChange}
              />
            </label>
            <label>
              Cliente:
              <input
                type="text"
                name="NomeCliente"
                value={editingSchedule.NomeCliente}
                onChange={handleChange}
              />
            </label>
            <label>
              Data e Hora:
              <input
                type="datetime-local"
                name="dateTime"
                value={editingSchedule.dateTime}
                onChange={handleChange}
              />
            </label>
            <label>
              Descrição:
              <textarea
                name="Descricao"
                value={editingSchedule.Descricao}
                onChange={handleChange}
              />
            </label>
            <label>
              Duração:
              <input
                type="text"
                name="Duracao"
                value={editingSchedule.Duracao}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSaveEdit}>Salvar</button>
            <button onClick={() => setEditingSchedule(null)}>Cancelar</button>
          </form>
        </div>
      )}

      <footer className="footer">© 2024 Sattva</footer>
    </div>
  );
};

export default ViewSchedules;
