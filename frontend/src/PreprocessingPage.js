import React, { useEffect, useState } from 'react';
import { useDataPipeline } from './DataPipelineContext';

function PreprocessingPage() {
  const { tweets, preprocessed, setPreprocessed, setFeatures, setKlasifikasi } = useDataPipeline();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const doPreprocess = async () => {
      if (!tweets.length) return;
      setLoading(true);
      const results = [];
      for (const tw of tweets) {
        const res = await fetch('http://localhost:5000/preprocess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tweet: tw.content }),
        });
        const data = await res.json();
        results.push({ ...tw, clean_tokens: data.clean_tokens });
      }
      setPreprocessed(results);
      setFeatures(null);
      setKlasifikasi([]);
      setLoading(false);
    };
    doPreprocess();
    // eslint-disable-next-line
  }, [tweets]);

  return (
    <div className="card" style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2 style={{ color: "#1976d2", marginBottom: 24 }}>Pre Processing Data</h2>
      {loading && <div>Memproses...</div>}
      {!loading && preprocessed.length > 0 && (
        <ol style={{ marginTop: 16, paddingLeft: 20 }}>
          {preprocessed.map((tw, i) => (
            <li key={i} style={{
              marginBottom: 24,
              background: "#f4faff",
              borderRadius: 10,
              padding: "16px 20px",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.06)"
            }}>
              <div style={{ fontWeight: "bold", marginBottom: 8, color: "#232946" }}>
                Tweet:
              </div>
              <div style={{ marginBottom: 10 }}>{tw.content}</div>
              <div style={{ fontWeight: "bold", marginBottom: 4, color: "#1976d2" }}>
                Tweet Bersih:
              </div>
              <div style={{
                background: "#e3eafc",
                borderRadius: 6,
                padding: "8px 12px",
                fontFamily: "monospace",
                fontSize: "1rem",
                color: "#232946",
                wordBreak: "break-word",
                marginBottom: 8
              }}>
                {tw.clean_tokens.join(" ")}
              </div>
              <div style={{ fontWeight: "bold", marginBottom: 4, color: "#1976d2" }}>
                Token:
              </div>
              <div style={{
                background: "#e3eafc",
                borderRadius: 6,
                padding: "8px 12px",
                fontFamily: "monospace",
                fontSize: "1rem",
                color: "#232946",
                wordBreak: "break-word"
              }}>
                {JSON.stringify(tw.clean_tokens)}
              </div>
            </li>
          ))}
        </ol>
      )}
      {!loading && !preprocessed.length && <div>Belum ada data crawling. Silakan crawling dulu.</div>}
    </div>
  );
}

export default PreprocessingPage;