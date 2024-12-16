import React, { useState } from 'react';
import api from './services/api';
import './style/Login.css';

const Login: React.FC = () => {
  const [Email, setEmail] = useState('');
  const [Senha, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post('/login', { Email, Senha });
      // Redirecione para a página Home se o login for bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h1>Sattva</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="text" value={Senha} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='button' type="submit">Login</button>
      </form>
      <footer>© 2024 Sattva</footer>
    </div>
  );
};

export default Login;
