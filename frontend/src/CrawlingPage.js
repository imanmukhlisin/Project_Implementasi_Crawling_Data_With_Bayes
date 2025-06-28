import React, { useState } from 'react';
import { useDataPipeline } from './DataPipelineContext';

function CrawlingPage() {
  const [hashtag, setHashtag] = useState('');
  const [jumlah, setJumlah] = useState(10);
  const { tweets, setTweets, setPreprocessed, setFeatures, setKlasifikasi } = useDataPipeline();

  const handleCrawl = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hashtag, jumlah }),
      });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setTweets(data.tweets);
      setPreprocessed([]); // reset pipeline
      setFeatures(null);
      setKlasifikasi([]);
    } catch (err) {
      alert('Gagal mengambil data: ' + err.message);
    }
  };

  return (
    <div className="card">
      <h2>Crawling Data Twitter</h2>
      <form onSubmit={handleCrawl}>
        <input
          type="text"
          placeholder="Hashtag atau kata kunci"
          value={hashtag}
          onChange={e => setHashtag(e.target.value)}
          style={{ width: '60%', marginRight: 8 }}
        />
        <input
          type="number"
          placeholder="Jumlah Tweet"
          value={jumlah}
          min={1}
          max={100}
          onChange={e => setJumlah(e.target.value)}
          style={{ width: '20%', marginRight: 8 }}
        />
        <button type="submit">Ambil Data</button>
      </form>
      <div style={{ marginTop: 16 }}>
        {tweets.length > 0 && (
          <div>
            <strong style={{ fontSize: "1.1rem", color: "#1976d2" }}>Hasil Crawl:</strong>
            <ol style={{ marginTop: 12, paddingLeft: 20 }}>
              {tweets.map((tw, idx) => (
                <li key={idx} style={{
                  marginBottom: 18,
                  background: "#f4faff",
                  borderRadius: 10,
                  padding: "14px 18px",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.06)",
                  listStyle: "decimal"
                }}>
                  <div style={{ fontWeight: "bold", color: "#232946", marginBottom: 4 }}>
                    @{tw.username || tw.id}
                    <span style={{ fontWeight: "normal", color: "#555", marginLeft: 8 }}>
                      ({tw.date})
                    </span>
                  </div>
                  <div style={{
                    marginTop: 6,
                    color: "#232946",
                    wordBreak: "break-word",
                    fontSize: "1rem"
                  }}>
                    {tw.content}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default CrawlingPage;