import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, saneamentoService } from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [dados, setDados] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setUser(currentUser);
        loadData();
    }, [navigate]);

    const loadData = async () => {
        try {
            const response = await saneamentoService.getEstatisticas();
            setDados(response.data);
        } catch (err) {
            setError('Erro ao carregar dados');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>🚰 Saneamento Recife</h1>
                    <div className="user-info">
                        <span>Olá, {user?.name}!</span>
                        <button onClick={handleLogout} className="logout-button">
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                {error && <div className="error-banner">{error}</div>}

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                            <h3>População</h3>
                            <p className="stat-value">
                                {dados?.populacao?.toLocaleString('pt-BR')}
                            </p>
                            <span className="stat-label">habitantes</span>
                        </div>
                    </div>

                    <div className="stat-card highlight">
                        <div className="stat-icon">💧</div>
                        <div className="stat-content">
                            <h3>Abastecimento de Água</h3>
                            <p className="stat-value">{dados?.abastecimentoAgua?.cobertura}%</p>
                            <span className="stat-label">cobertura</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🚿</div>
                        <div className="stat-content">
                            <h3>Esgotamento Sanitário</h3>
                            <p className="stat-value">{dados?.esgotamento?.cobertura}%</p>
                            <span className="stat-label">cobertura</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">♻️</div>
                        <div className="stat-content">
                            <h3>Coleta de Resíduos</h3>
                            <p className="stat-value">{dados?.residuosSolidos?.coleta}%</p>
                            <span className="stat-label">cobertura</span>
                        </div>
                    </div>
                </div>

                <div className="details-grid">
                    <div className="detail-card">
                        <h3>💧 Água - Detalhes</h3>
                        <div className="detail-items">
                            <div className="detail-item">
                                <span>Tratamento:</span>
                                <strong>{dados?.abastecimentoAgua?.tratamento}%</strong>
                            </div>
                            <div className="detail-item">
                                <span>Perdas:</span>
                                <strong>{dados?.abastecimentoAgua?.perdas}%</strong>
                            </div>
                        </div>
                    </div>

                    <div className="detail-card">
                        <h3>🚿 Esgoto - Detalhes</h3>
                        <div className="detail-items">
                            <div className="detail-item">
                                <span>Tratamento:</span>
                                <strong>{dados?.esgotamento?.tratamento}%</strong>
                            </div>
                            <div className="detail-item">
                                <span>Redes Coletoras:</span>
                                <strong>{dados?.esgotamento?.redesColetoras} km</strong>
                            </div>
                        </div>
                    </div>

                    <div className="detail-card">
                        <h3>♻️ Resíduos - Detalhes</h3>
                        <div className="detail-items">
                            <div className="detail-item">
                                <span>Reciclagem:</span>
                                <strong>{dados?.residuosSolidos?.reciclagem}%</strong>
                            </div>
                            <div className="detail-item">
                                <span>Destinação Adequada:</span>
                                <strong>{dados?.residuosSolidos?.destinacaoAdequada}%</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="dashboard-footer">
                    <p>Última atualização: {dados?.ultimaAtualizacao}</p>
                    <p>Sistema de Monitoramento de Saneamento Básico - Recife/PE</p>
                </footer>
            </main>
        </div>
    );
}
