import React from 'react';

function SentimentResult({ result }) {
  if (!result) return null;

  return (
    <div className="result">
      <h2>Hasil Analisis Sentimen</h2>
      <div>
        <strong>Tweet Asli:</strong>
        <div style={{ background: "#f4f6fb", padding: "8px", borderRadius: "6px", marginBottom: "8px" }}>
          {result.tweet}
        </div>
      </div>
      <div>
        <strong>Tweet Bersih:</strong>
        <div style={{ background: "#f4f6fb", padding: "8px", borderRadius: "6px", marginBottom: "8px" }}>
          {result.clean_tweet}
        </div>
      </div>
      <div>
        <strong>Sentimen:</strong> <span style={{ color: "#1976d2" }}>{result.sentiment}</span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <strong>Probabilitas:</strong>
        <ul>
          <li>Positif: {result.probabilities.positif.toPrecision(20)}</li>
          <li>Negatif: {result.probabilities.negatif}</li>
          <li>Netral: {result.probabilities.netral}</li>
        </ul>
      </div>
    </div>
  );
}

export default SentimentResult;