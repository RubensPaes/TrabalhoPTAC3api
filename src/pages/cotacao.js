import { useState } from 'react';

export default function CotacaoForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarCotacoes = async () => {
    if (!startDate || !endDate) {
      setErro('Preencha as duas datas.');
      return;
    }

    const dataInicio = startDate.replace(/-/g, '');
    const dataFim = endDate.replace(/-/g, '');

    setLoading(true);
    setErro('');
    setDados([]);

    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/json/daily/USD-BRL/?start_date=${dataInicio}&end_date=${dataFim}`
      );

      if (!response.ok) throw new Error('Erro ao buscar dados');

      const json = await response.json();
      setDados(json.reverse()); 
    } catch (e) {
      setErro('Erro ao buscar cotações.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Buscar Cotação USD/BRL</h1>

      <label>
        Data Início:
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </label>
      <br />

      <label>
        Data Fim:
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </label>
      <br /><br />

      <button onClick={buscarCotacoes}>Buscar</button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {loading && <p>Carregando...</p>}

      {dados.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Resultados:</h2>
          {dados.map(cot => (
            <div key={cot.timestamp} style={{ marginBottom: '1.5rem' }}>
              <p><strong>Data:</strong> {new Date(cot.timestamp * 1000).toLocaleDateString()}</p>
              <p><strong>Compra:</strong> R$ {cot.bid}</p>
              <p><strong>Venda:</strong> R$ {cot.ask}</p>
              <p><strong>Alta:</strong> R$ {cot.high}</p>
              <p><strong>Baixa:</strong> R$ {cot.low}</p>
              <p><strong>Variação:</strong> {cot.varBid} ({cot.pctChange}%)</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
