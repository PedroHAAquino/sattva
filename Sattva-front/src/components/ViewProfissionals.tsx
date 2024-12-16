import React, { useState, useEffect } from 'react';
import api from './services/api';
import './style/view.css';

interface Professional {
  ID_Profissional: number;
  NomeProfissional: string;
  Telefone: string;
  Email: string;
  Especialidade: string;
}

const ViewProfessionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);

  // Fetch professionals when the component mounts
  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await api.get('/profissionais');
      setProfessionals(response.data);
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/profissionais/${id}`);
      setProfessionals(professionals.filter(professional => professional.ID_Profissional !== id));
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
    }
  };

  const handleEdit = (professional: Professional) => {
    setEditingProfessional(professional);
  };

  const handleSaveEdit = async () => {
    if (editingProfessional) {
      try {
        await api.put(`/profissionais/${editingProfessional.ID_Profissional}`, editingProfessional);
        setEditingProfessional(null);
        fetchProfessionals(); // Recarregar lista atualizada
      } catch (error) {
        console.error('Erro ao salvar profissional:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingProfessional) {
      const { name, value } = e.target;
      setEditingProfessional({ ...editingProfessional, [name]: value });
    }
  };

  return (
    <div className="container">
      <header className="header">Visualizar Profissionais</header>

      {professionals.map(professional => (
        <div key={professional.ID_Profissional} className="item">
          <h3>Profissional #{professional.ID_Profissional}</h3>
          <p><strong>Nome:</strong> {professional.NomeProfissional}</p>
          <p><strong>Telefone:</strong> {professional.Telefone}</p>
          <p><strong>Email:</strong> {professional.Email}</p>
          <p><strong>Especialidade:</strong> {professional.Especialidade}</p>
          <button onClick={() => handleEdit(professional)}>Editar</button>
          <button onClick={() => handleDelete(professional.ID_Profissional)}>Excluir</button>
        </div>
      ))}

      {editingProfessional && (
        <div className="edit-modal">
          <h3>Editando Profissional #{editingProfessional.ID_Profissional}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Nome:
              <input
                type="text"
                name="NomeProfissional"
                value={editingProfessional.NomeProfissional}
                onChange={handleChange}
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                name="Telefone"
                value={editingProfessional.Telefone}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="Email"
                value={editingProfessional.Email}
                onChange={handleChange}
              />
            </label>
            <label>
              Especialidade:
              <input
                type="text"
                name="Especialidade"
                value={editingProfessional.Especialidade}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSaveEdit}>Salvar</button>
            <button onClick={() => setEditingProfessional(null)}>Cancelar</button>
          </form>
        </div>
      )}

      <footer className="footer">© 2024 Sattva</footer>
    </div>
  );
};

export default ViewProfessionals;
