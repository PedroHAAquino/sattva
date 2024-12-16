import React, { useState } from 'react';
import api from './services/api';
import './style/services.css';

const ServiceForm: React.FC = () => {
  const [Descricao, setDescription] = useState('');
  const [Valor, setValue] = useState(0);
  const [duracao, setTime] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Verificar se os campos obrigatórios estão preenchidos
    if (!Descricao || Valor <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await api.post('/servicos', {
        Descricao,
        Valor,
        duracao,
      });
      // Redirecione ou mostre uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        Cadastrar Serviço
      </header>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
            <div className="form-group">
              <label>
                Descrição: <span className="required">*</span>
                <input
                  type="text"
                  value={Descricao}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={50}
                  placeholder="Máximo 50 caracteres"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Valor: <span className="required">*</span>
                <input
                  type="number"
                  value={Valor}
                  onChange={(e) => setValue(Number(e.target.value))}
                  placeholder="Valor do serviço"
                />
              </label>
            </div>
          </div>
          <div className="column">
            <div className="form-group">
              <label>
                Tempo (minutos):
                <input
                  type="number"
                  value={duracao}
                  onChange={(e) => setTime(Number(e.target.value))}
                  placeholder="Duração em minutos"
                />
              </label>
            </div>
          </div>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <footer className="footer">© 2024 Sattva</footer>
    </div>
  );
};

export default ServiceForm;
