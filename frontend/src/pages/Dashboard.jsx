import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/saneamento/estatisticas', config);
      setDados(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Carregando dados...</div>;

  return (
    <div className="dashboard">
      <header>
        <div>
          <h1>🌊 Saneamento Básico - Recife/PE</h1>
          <p>
            Dados de {dados.ano} • População: {dados.populacao.toLocaleString('pt-BR')} habitantes
          </p>
        </div>
        <button onClick={onLogout}>Sair</button>
      </header>

      <main>
        <section className="stats-section">
          <h2>💧 Abastecimento de Água</h2>
          <div className="stats-grid">
            <div className="stat-card blue">
              <h3>Atendimento</h3>
              <div className="value">{dados.agua.atendimento}%</div>
              <p>da população atendida</p>
            </div>
            <div className="stat-card blue">
              <h3>Ligações</h3>
              <div className="value">{dados.agua.ligacoes.toLocaleString('pt-BR')}</div>
              <p>ligações ativas</p>
            </div>
            <div className="stat-card red">
              <h3>Perdas</h3>
              <div className="value">{dados.agua.perdas}%</div>
              <p>índice de perdas</p>
            </div>
            <div className="stat-card blue">
              <h3>Consumo Médio</h3>
              <div className="value">{dados.agua.consumoMedio}L</div>
              <p>por habitante/dia</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>🚰 Esgotamento Sanitário</h2>
          <div className="stats-grid">
            <div className="stat-card purple">
              <h3>Coleta</h3>
              <div className="value">{dados.esgoto.coleta}%</div>
              <p>da população atendida</p>
            </div>
            <div className="stat-card purple">
              <h3>Tratamento</h3>
              <div className="value">{dados.esgoto.tratamento}%</div>
              <p>do esgoto tratado</p>
            </div>
            <div className="stat-card purple">
              <h3>Ligações</h3>
              <div className="value">{dados.esgoto.ligacoes.toLocaleString('pt-BR')}</div>
              <p>ligações ativas</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>♻️ Resíduos Sólidos</h2>
          <div className="stats-grid">
            <div className="stat-card green">
              <h3>Coleta</h3>
              <div className="value">{dados.residuos.coleta}%</div>
              <p>da população atendida</p>
            </div>
            <div className="stat-card green">
              <h3>Coleta Seletiva</h3>
              <div className="value">{dados.residuos.coletaSeletiva}%</div>
              <p>de cobertura</p>
            </div>
            <div className="stat-card green">
              <h3>Volume Diário</h3>
              <div className="value">{dados.residuos.toneladas}t</div>
              <p>toneladas/dia</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>💰 Investimentos ({dados.ano})</h2>
          <div className="stats-grid">
            <div className="stat-card orange">
              <h3>Total</h3>
              <div className="value">R$ {dados.investimentos.total}M</div>
              <p>investimento total</p>
            </div>
            <div className="stat-card orange">
              <h3>Água</h3>
              <div className="value">R$ {dados.investimentos.agua}M</div>
              <p>em abastecimento</p>
            </div>
            <div className="stat-card orange">
              <h3>Esgoto</h3>
              <div className="value">R$ {dados.investimentos.esgoto}M</div>
              <p>em esgotamento</p>
            </div>
            <div className="stat-card orange">
              <h3>Resíduos</h3>
              <div className="value">R$ {dados.investimentos.residuos}M</div>
              <p>em coleta</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Fonte: Sistema Nacional de Informações sobre Saneamento (SNIS) - {dados.ano}</p>
      </footer>
    </div>
  );
}

export default Dashboard;
