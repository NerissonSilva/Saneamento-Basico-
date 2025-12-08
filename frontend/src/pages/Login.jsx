import { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const { data } = await axios.post(endpoint, { email, password });

      if (isRegister) {
        alert('Cadastro realizado! Faça login.');
        setIsRegister(false);
        setPassword('');
      } else {
        onLogin(data.token);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao processar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🌊 Saneamento Recife</h1>
          <p>Estatísticas de Saneamento Básico em Recife/PE</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>{isRegister ? 'Criar Conta' : 'Entrar'}</h2>

          {error && <div className="error">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processando...' : isRegister ? 'Cadastrar' : 'Entrar'}
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? 'Já tem conta? Entrar' : 'Criar nova conta'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
