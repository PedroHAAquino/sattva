import React, { useState, useEffect } from 'react';
import api from './services/api';
import './style/view.css';

interface Service {
  ID_Servico: number;
  descricao: string;
  duracao: string;
  valor: number;
}

const ViewServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/servicos');
      setServices(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/servicos/${id}`);
      setServices(services.filter(service => service.ID_Servico !== id));
    } catch (error) {
      console.error('Erro ao excluir serviço:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  const handleSaveEdit = async () => {
    if (editingService) {
      try {
        await api.put(`/servicos/${editingService.ID_Servico}`, editingService);
        setEditingService(null);
        fetchServices(); // Atualizar a lista de serviços
      } catch (error) {
        console.error('Erro ao salvar serviço:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingService) {
      const { name, value } = e.target;
      setEditingService({ ...editingService, [name]: value });
    }
  };

  return (
    <div className="container">
      <header className="header">Visualizar Serviços</header>

      {services.map(service => (
        <div key={service.ID_Servico} className="item">
          <h3>Serviço #{service.ID_Servico}</h3>
          <p><strong>Descrição:</strong> {service.descricao}</p>
          <p><strong>Duração:</strong> {service.duracao}</p>
          <p><strong>Valor:</strong> R$ {service.valor.toFixed(2)}</p>
          <button onClick={() => handleEdit(service)}>Editar</button>
          <button onClick={() => handleDelete(service.ID_Servico)}>Excluir</button>
        </div>
      ))}

      {editingService && (
        <div className="edit-modal">
          <h3>Editando Serviço #{editingService.ID_Servico}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Descrição:
              <textarea
                name="descricao"
                value={editingService.descricao}
                onChange={handleChange}
              />
            </label>
            <label>
              Duração:
              <input
                type="text"
                name="duracao"
                value={editingService.duracao}
                onChange={handleChange}
              />
            </label>
            <label>
              Valor:
              <input
                type="number"
                name="valor"
                value={editingService.valor}
                step="0.01"
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSaveEdit}>Salvar</button>
            <button onClick={() => setEditingService(null)}>Cancelar</button>
          </form>
        </div>
      )}

      <footer className="footer">© 2024 Sattva</footer>
    </div>
  );
};

export default ViewServices;
