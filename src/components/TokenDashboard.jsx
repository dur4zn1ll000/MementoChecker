import React, { useState, useEffect } from 'react';
import { RefreshCw, Coins, TrendingUp, Package, Eye, AlertCircle } from 'lucide-react';

const styles = `
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
}
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.logo-text h1 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
}
.logo-text p {
  margin: 0;
  font-size: 0.875rem;
  color: #718096;
}
.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.refresh-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-1px);
}
.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
.stat-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.stat-icon.green {
  background: linear-gradient(135deg, #48bb78, #38a169);
}
.stat-icon.orange {
  background: linear-gradient(135deg, #ed8936, #dd6b20);
}
.stat-icon.purple {
  background: linear-gradient(135deg, #9f7aea, #805ad5);
}
.stat-text .value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}
.stat-text .label {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
}
.update-info {
  text-align: center;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
}
.error-card {
  background: rgba(254, 226, 226, 0.95);
  border: 1px solid rgba(229, 62, 62, 0.5);
  color: #9B2C2C;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px rgba(229, 62, 62, 0.1);
}
.error-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.error-icon {
  color: #E53E3E;
  flex-shrink: 0;
  margin-top: 2px;
}
.error-text h3 {
  margin: 0 0 4px 0;
  font-weight: 600;
  font-size: 1.1rem;
}
.error-text p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}
.loading-container {
  text-align: center;
  padding: 3rem 0;
  color: rgba(255, 255, 255, 0.9);
}
.loading-spinner {
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem auto;
  color: rgba(255, 255, 255, 0.9);
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.tokens-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.token-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.token-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
.token-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.token-info {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
}
.token-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}
.token-details {
    overflow: hidden;
}
.token-details h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.token-details p {
  margin: 0;
  font-size: 0.875rem;
  color: #718096;
}
.token-total {
  text-align: right;
  flex-shrink: 0;
  margin-left: 8px;
}
.token-total .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}
.token-total .label {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
}
.token-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.price-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #718096;
}
.price-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #38a169;
}
.token-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
}
.value-label {
  color: #718096;
}
.value-amount {
  font-weight: 600;
  color: #1a202c;
}
.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: rgba(255, 255, 255, 0.9);
}
.empty-icon {
  margin: 0 auto 1rem auto;
  opacity: 0.6;
}
.empty-state h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}
.empty-state p {
  margin: 0;
  opacity: 0.8;
}
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  .main-content {
    padding: 1rem;
  }
  .stats-grid,
  .tokens-grid {
    grid-template-columns: 1fr;
  }
}
`;

const WEI_LIKE_DIVISOR = 1e18;
const AGGREGATE_VALUE_DISPLAY_DECIMALS = 2;

const TOKEN_IDS = [
  "1099511627776",
  "1116691496960",
  "1112396529664",
  "1103806595072",
  "1108101562368",
  "1120986464256",
  "1168231104512",
  "1172526071808",
  "1176821039104"
];

const TokenDashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [ethToUsd, setEthToUsd] = useState(null);
  const [wallet, setWallet] = useState('');
  const [walletInput, setWalletInput] = useState('');

  const API_KEY = process.env.REACT_APP_SKY_MAVIS_API_KEY;

  const makeGraphQLQuery = (ownerWallet) => {
    let tokensQuery = TOKEN_IDS.map((id, idx) => `
          token${idx + 1}: erc1155Token(
            tokenType: Material
            tokenId: "${id}"
            owner: "${ownerWallet}"
          ) {
            tokenId
            name
            total
            minPrice
          }
        `).join('\n');
    return `
        query MyQuery {
          ethExchangeRate {
            usd
          }
          ${tokensQuery}
        }`;
  };

  const fetchTokenData = async (customWallet) => {
    setLoading(true);
    setError(null);

    const ownerWallet = customWallet || wallet;

    if (!ownerWallet) {
      setError("Por favor, ingresa una wallet.");
      setLoading(false);
      return;
    }
    if (API_KEY === 'aqui_tu_api' || API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
      setError("Por favor, introduce una API Key válida de Sky Mavis.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api-gateway.skymavis.com/graphql/axie-marketplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          query: makeGraphQLQuery(ownerWallet)
        })
      });

      const responseBody = await response.json();

      if (!response.ok) {
        const errorMessage = responseBody?.errors?.[0]?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      if (responseBody.errors) {
        throw new Error(responseBody.errors.map(e => e.message).join(', '));
      }

      if (!responseBody.data) {
        throw new Error("No se recibieron datos de la API.");
      }

      const ethRate = responseBody.data.ethExchangeRate?.usd;
      setEthToUsd(ethRate);

      const tokenArray = Object.entries(responseBody.data)
        .filter(([key, _]) => key.startsWith('token'))
        .map(([key, value]) => ({
          ...value,
          key
        }))
        .filter(token => token !== null);

      setTokens(tokenArray);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Error fetching token data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet) {
      fetchTokenData(wallet);
    }
    // No se pone fetchTokenData como dependencia para evitar bucles: depende solo de wallet.
  }, [wallet]);

  const minPriceETH = (price) => {
    if (price == null || price === '' || isNaN(Number(price))) return 0;
    return Number(price) / WEI_LIKE_DIVISOR;
  };

  const formatMinDisplayPriceUSD = (price) => {
    if (ethToUsd == null) return 'N/A';
    const eth = minPriceETH(price);
    const usd = eth * ethToUsd;
    return `$${usd.toFixed(AGGREGATE_VALUE_DISPLAY_DECIMALS)}`;
  };

  const calculateItemValueInUSD = (minPrice, total) => {
    if (ethToUsd == null) return 0;
    const eth = minPriceETH(minPrice);
    const qtyNum = Number(total);
    if (isNaN(qtyNum)) return 0;
    return eth * qtyNum * ethToUsd;
  };

  const formatAggregateCurrencyValueUSD = (value) => {
    if (value == null || isNaN(Number(value))) return 'N/A';
    return `$${Number(value).toFixed(AGGREGATE_VALUE_DISPLAY_DECIMALS)}`;
  };

  const formatTokenId = (tokenId) => {
    if (!tokenId) return 'N/A';
    return `...${tokenId.slice(-6)}`;
  };

  const getTotalPortfolioValueUSD = () => {
    return tokens.reduce((sum, token) => {
      const itemValue = calculateItemValueInUSD(token.minPrice, token.total);
      return sum + itemValue;
    }, 0);
  };

  const TokenCard = ({ token }) => {
    const estimatedValueInUSD = calculateItemValueInUSD(token.minPrice, token.total);

    return (
      <div className="token-card">
        <div className="token-header">
          <div className="token-info">
            <div className="token-icon">
              {TOKEN_IMAGES[token.tokenId] ? (
                <img
                  src={TOKEN_IMAGES[token.tokenId]}
                  alt={token.name || 'Memento'}
                  style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }}
                />
              ) : (
                <Package size={24} />
              )}
            </div>
            <div className="token-details">
              <h3>{token.name || 'Material Token'}</h3>
              <p>ID: {formatTokenId(token.tokenId)}</p>
            </div>
          </div>
          <div className="token-total">
            <div className="value">{token.total || 0}</div>
            <div className="label">Total</div>
          </div>
        </div>
        <div className="token-price">
          <div className="price-label">
            <TrendingUp size={16} />
            <span>Min Price</span>
          </div>
          <div className="price-value">
            {formatMinDisplayPriceUSD(token.minPrice)}
          </div>
        </div>
        <div className="token-value">
          <span className="value-label">Est. Value</span>
          <span className="value-amount">
            {formatAggregateCurrencyValueUSD(estimatedValueInUSD)}
          </span>
        </div>
      </div>
    );
  };

  function handleWalletSubmit(e) {
    e.preventDefault();
    setTokens([]);
    setError(null);
    setWallet(walletInput.trim());
  }
  const TOKEN_IMAGES = {
    "1099511627776": require('../assets/mementos/1099511627776.png'),
    "1116691496960": require('../assets/mementos/1116691496960.png'),
    "1112396529664": require('../assets/mementos/1112396529664.png'),
    "1103806595072": require('../assets/mementos/1103806595072.png'),
    "1108101562368": require('../assets/mementos/1108101562368.png'),
    "1120986464256": require('../assets/mementos/1120986464256.png'),
    "1168231104512": require('../assets/mementos/1168231104512.png'),
    "1172526071808": require('../assets/mementos/1172526071808.png'),
    "1176821039104": require('../assets/mementos/1176821039104.png'),
  };


  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-container">
        <div className="header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <Eye size={24} />
              </div>
              <div className="logo-text">
                <h1>Axie Infinity Dashboard</h1>
                <p>Material Token Portfolio</p>
              </div>
            </div>
            <button
              onClick={() => fetchTokenData()}
              disabled={loading || !wallet}
              className="refresh-btn"
            >
              <RefreshCw size={16} className={loading ? 'loading-spinner' : ''} />
              <span>{loading ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        <div className="main-content">
          <form
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}
            onSubmit={handleWalletSubmit}
          >
            <input
              type="text"
              placeholder="Ingresa tu wallet (0x...)"
              value={walletInput}
              onChange={e => setWalletInput(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '340px'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#38a169',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              disabled={loading || !walletInput.trim()}
            >
              Ver Portfolio
            </button>
          </form>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon green">
                  <Coins size={24} />
                </div>
                <div className="stat-text">
                  <div className="value">{tokens.length}</div>
                  <div className="label">Unique Tokens</div>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon orange">
                  <Package size={24} />
                </div>
                <div className="stat-text">
                  <div className="value">
                    {tokens.reduce((sum, token) => sum + (parseInt(token.total, 10) || 0), 0)}
                  </div>
                  <div className="label">Total Items</div>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon purple">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-text">
                  <div className="value">{formatAggregateCurrencyValueUSD(getTotalPortfolioValueUSD())}</div>
                  <div className="label">Portfolio Value</div>
                </div>
              </div>
            </div>
          </div>
          {lastUpdate && !loading && !error && wallet && (
            <div className="update-info">
              <p>Last updated: {lastUpdate.toLocaleString()}</p>
            </div>
          )}
          {error && (
            <div className="error-card">
              <div className="error-content">
                <div className="error-icon"><AlertCircle size={24} /></div>
                <div className="error-text">
                  <h3>Error al cargar datos</h3>
                  <p>{error}</p>
                  {API_KEY === 'aqui_tu_api' && (
                    <p style={{ fontSize: '0.8rem', marginTop: '8px', opacity: '0.8' }}>
                      Asegúrate de reemplazar 'aqui_tu_api' con tu API key real de Sky Mavis en el código.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {loading && (
            <div className="loading-container">
              <RefreshCw size={32} className="loading-spinner" />
              <p>Loading token data...</p>
            </div>
          )}
          {!loading && tokens.length > 0 && !error && wallet && (
            <div className="tokens-grid">
              {tokens.map((token) => (
                <TokenCard key={token.key || token.tokenId} token={token} />
              ))}
            </div>
          )}
          {!loading && wallet && tokens.length === 0 && !error && (
            <div className="empty-state">
              <Package size={64} className="empty-icon" />
              <h3>No se encontraron tokens</h3>
              <p>Intenta refrescar o revisa la configuración de tu API y la wallet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TokenDashboard;