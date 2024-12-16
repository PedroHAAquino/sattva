import React, { useState } from 'react';
import api from './services/api';
import './style/client.css';

const ClientForm: React.FC = () => {
  const [Nome, setName] = useState('');
  const [Telefone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setPassword] = useState('');
  const [Data_Nasc, setBirthdate] = useState('');
  const [CPF, setCpf] = useState('');
  const [Sexo, setGender] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Verificar se os campos obrigatórios estão preenchidos
    if (!Nome || !Email || !Senha || !Sexo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await api.post('/clientes', {
        Nome,
        Telefone,
        Email,
        Senha,
        Data_Nasc,
        CPF,
        Sexo,
      });
      // Redirecione ou mostre uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        Cadastrar Cliente
      </header>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
            <div className="form-group">
              <label>
                Nome: <span className="required">*</span>
                <input
                  type="text"
                  value={Nome}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  placeholder="Máximo 50 caracteres"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Telefone:
                <input
                  type="text"
                  value={Telefone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={11}
                  placeholder="Máximo 11 caracteres"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Email: <span className="required">*</span>
                <input
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={35}
                  placeholder="Inclua '@', máximo 35 caracteres"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Senha: <span className="required">*</span>
                <input
                  type="password"
                  value={Senha}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={35}
                  placeholder="Máximo 35 caracteres"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Data de Nascimento:
                <input
                  type="date"
                  value={Data_Nasc}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="column">
            <div className="form-group">
              <label>
                CPF:
                <input
                  type="text"
                  value={CPF}
                  onChange={(e) => setCpf(e.target.value)}
                  maxLength={14}
                  placeholder="xxx.xxx.xxx-xx"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Sexo: <span className="required">*</span>
                <select value={Sexo} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
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

export default ClientForm;
