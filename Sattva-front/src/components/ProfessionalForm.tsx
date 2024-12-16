import React, { useState } from 'react';
import api from './services/api';
import './style/professional.css';

const ProfessionalForm: React.FC = () => {
  const [Nome, setName] = useState('');
  const [Telefone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setPassword] = useState('');
  const [Data_Nasc, setBirthdate] = useState('');
  const [CPF, setCpf] = useState('');
  const [Sexo, setGender] = useState('');
  const [Especialidade, setSpecialty] = useState('');
  const [Horarios, setHours] = useState('');
  const [Custo, setCost] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Verificar se os campos obrigatórios estão preenchidos
    if (!Nome || !Email || !Senha || !Sexo || !Especialidade || !Custo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await api.post('/profissionais', {
        Nome,
        Telefone,
        Email,
        Senha,
        Data_Nasc,
        CPF,
        Sexo,
        Especialidade,
        Horarios,
        Custo,
      });
      // Redirecione ou mostre uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao cadastrar profissional:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        Cadastrar Profissional
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
                  type="text"
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
            <div className="form-group">
              <label>
                Especialidade: <span className="required">*</span>
                <input
                  type="text"
                  value={Especialidade}
                  onChange={(e) => setSpecialty(e.target.value)}
                  maxLength={20}
                  placeholder="Máximo 20 caracteres"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Horários:
                <input
                  type="text"
                  value={Horarios}
                  onChange={(e) => setHours(e.target.value)}
                  maxLength={100}
                  placeholder="Máximo 100 caracteres"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Custo:
                <input
                  type="number"
                  value={Custo}
                  onChange={(e) => setCost(e.target.value)}
                  maxLength={100}
                  placeholder="Valor da Seção do Profissional"
                />
              </label>
            </div>
          </div>
        </div>
        <button className='button' type="submit">Cadastrar</button>
      </form>
      <footer className="footer">© 2024 Sattva</footer>
    </div>
  );
};

export default ProfessionalForm;
