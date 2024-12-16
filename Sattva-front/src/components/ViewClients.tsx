import React, { useState, useEffect } from 'react';
import api from './services/api';
import './style/view.css';

interface Client {
  ID_Cliente: number;
  nomeCliente: string;
  Telefone: string;
  Email: string;
  Sexo: string;
}

const ViewClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);


  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clientes');
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/clientes/${id}`);
      setClients(clients.filter(client => client.ID_Cliente !== id));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
  };

  const handleSaveEdit = async () => {
    if (editingClient) {
      try {
        await api.put(`/clientes/${editingClient.ID_Cliente}`, editingClient);
        setEditingClient(null);
        fetchClients(); // Recarregar lista atualizada
      } catch (error) {
        console.error('Erro ao salvar cliente:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingClient) {
      const { name, value } = e.target;
      setEditingClient({ ...editingClient, [name]: value });
    }
  };

  return (
    <div className="container">
      <header className="header">Visualizar Clientes</header>

      {clients.map(client => (
        <div key={client.ID_Cliente} className="item">
          <h3>Cliente #{client.ID_Cliente}</h3>
          <p><strong>Nome:</strong> {client.nomeCliente}</p>
          <p><strong>Telefone:</strong> {client.Telefone}</p>
          <p><strong>Email:</strong> {client.Email}</p>
          <p><strong>Sexo:</strong> {client.Sexo}</p>
          <button onClick={() => handleEdit(client)}>Editar</button>
          <button onClick={() => handleDelete(client.ID_Cliente)}>Excluir</button>
        </div>
      ))}

      {editingClient && (
        <div className="edit-modal">
          <h3>Editando Cliente #{editingClient.ID_Cliente}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Nome:
              <input
                type="text"
                name="nomeCliente"
                value={editingClient.nomeCliente}
                onChange={handleChange}
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                name="Telefone"
                value={editingClient.Telefone}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="Email"
                value={editingClient.Email}
                onChange={handleChange}
              />
            </label>
            <label>
              Sexo:
              <input
                type="text"
                name="Sexo"
                value={editingClient.Sexo}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSaveEdit}>Salvar</button>
            <button onClick={() => setEditingClient(null)}>Cancelar</button>
          </form>
        </div>
      )}

      <footer className="footer">© 2024 Sattva</footer>
    </div>
  );
};

export default ViewClients;
