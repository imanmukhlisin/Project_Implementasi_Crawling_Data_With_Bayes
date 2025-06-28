import React, { useState } from 'react';

function SentimentForm({ onResult }) {
  const [tweet, setTweet] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweet }),
    });
    const data = await res.json();
    onResult(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tweetInput"><strong>Masukkan Tweet:</strong></label>
      <textarea
        id="tweetInput"
        value={tweet}
        onChange={e => setTweet(e.target.value)}
        placeholder="Masukkan tweet di sini..."
        rows={3}
        style={{ width: '100%' }}
      />
      <button type="submit">Analisis Sentimen</button>
    </form>
  );
}

export default SentimentForm;