import React from 'react';
import { useDataPipeline } from './DataPipelineContext';

function EkstraksiFiturPage() {
  const { preprocessed, features, setFeatures } = useDataPipeline();

  const handleEkstraksiFitur = () => {
    const allTokens = preprocessed.flatMap(tw => tw.clean_tokens);
    const freq = {};
    allTokens.forEach(token => {
      freq[token] = (freq[token] || 0) + 1;
    });
    const vocab = Object.keys(freq);
    const vocabSize = vocab.length;
    const total = allTokens.length;
    const prob = {};
    vocab.forEach(token => {
      prob[token] = (freq[token] + 1) / (total + vocabSize);
    });
    setFeatures({ freq, prob }); // <-- simpan ke context global!
  };

  return (
    <div className="card">
      <h2>Ekstraksi Fitur & Probabilitas</h2>
      {preprocessed.length === 0 && <div>Belum ada data preprocessing. Silakan preprocessing dulu.</div>}
      {preprocessed.length > 0 && (
        <>
          <button onClick={handleEkstraksiFitur}>Ekstraksi Fitur & Probabilitas</button>
          {features && (
            <div style={{ marginTop: 20 }}>
              <b>Frekuensi & Probabilitas Kata:</b>
              <div style={{
                overflowX: "auto",
                marginTop: 12,
                background: "#f4faff",
                borderRadius: 8,
                padding: 12,
                maxHeight: 350
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "1rem" }}>
                  <thead>
                    <tr style={{ background: "#e3eafc" }}>
                      <th style={{ padding: 8, border: "1px solid #b8c1ec" }}>Kata</th>
                      <th style={{ padding: 8, border: "1px solid #b8c1ec" }}>Frekuensi</th>
                      <th style={{ padding: 8, border: "1px solid #b8c1ec" }}>Probabilitas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(features.freq).map((token, idx) => (
                      <tr key={token} style={{ background: idx % 2 === 0 ? "#fff" : "#f4faff" }}>
                        <td style={{ padding: 8, border: "1px solid #b8c1ec" }}>{token}</td>
                        <td style={{ padding: 8, border: "1px solid #b8c1ec" }}>{features.freq[token]}</td>
                        <td style={{ padding: 8, border: "1px solid #b8c1ec" }}>
                          {features.prob[token].toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EkstraksiFiturPage;