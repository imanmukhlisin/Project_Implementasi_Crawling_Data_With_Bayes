import React, { useEffect } from "react";
import { useDataPipeline } from "./DataPipelineContext";

function KlasifikasiPage() {
  const { tweets, features, klasifikasi, setKlasifikasi } = useDataPipeline();

  useEffect(() => {
    const doClassify = async () => {
      if (!tweets.length || !features) return;
      const results = [];
      for (const tw of tweets) {
        const res = await fetch("http://localhost:5000/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweet: tw.content }),
        });
        const data = await res.json();
        results.push({
          tweet: tw.content,
          sentiment: data.sentiment,
          probabilities: data.probabilities,
        });
      }
      setKlasifikasi(results);
    };
    doClassify();
    // eslint-disable-next-line
  }, [tweets, features]);

  return (
    <div className="card">
      <h2>Klasifikasi Naive Bayes</h2>
      {!klasifikasi.length && (
        <div>
          Belum ada data untuk diklasifikasikan. Silakan crawling & ekstraksi
          fitur dulu.
        </div>
      )}
      {klasifikasi.length > 0 && (
        <ol style={{ marginTop: 16 }}>
          {klasifikasi.map((res, i) => {
            // Hitung total vmap untuk bobot
            const totalVmap = Object.values(res.probabilities).reduce(
              (a, b) => a + b,
              0
            );
            return (
              <li
                key={i}
                style={{
                  background: "#f4f6fb",
                  padding: "18px",
                  borderRadius: "8px",
                  border: "1.5px solid #1976d2",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                  fontSize: "1rem",
                  marginBottom: 18,
                }}
              >
                <b>Tweet:</b> {res.tweet}
                <br />
                <b>Sentimen:</b>{" "}
                <span style={{ color: "#1976d2" }}>{res.sentiment}</span>
                <br />
                <b>Perbandingan Probabilitas & Bobot:</b>
                <table
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderCollapse: "collapse",
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#e3eafc" }}>
                      <th style={{ border: "1px solid #b8c1ec", padding: 6 }}>
                        No
                      </th>
                      <th style={{ border: "1px solid #b8c1ec", padding: 6 }}>
                        Kelas
                      </th>
                      <th style={{ border: "1px solid #b8c1ec", padding: 6 }}>
                        Nilai Vmap
                      </th>
                      <th style={{ border: "1px solid #b8c1ec", padding: 6 }}>
                        Bobot
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(res.probabilities).map(
                      ([kelas, vmap], idx) => (
                        <tr key={kelas}>
                          <td
                            style={{ border: "1px solid #b8c1ec", padding: 6 }}
                          >
                            {idx + 1}
                          </td>
                          <td
                            style={{ border: "1px solid #b8c1ec", padding: 6 }}
                          >
                            {kelas.charAt(0).toUpperCase() + kelas.slice(1)}
                          </td>
                          <td
                            style={{ border: "1px solid #b8c1ec", padding: 6 }}
                          >
                            {vmap.toLocaleString("en-US", {
                              minimumFractionDigits: 20,
                              maximumFractionDigits: 20,
                            })}
                          </td>
                          <td
                            style={{ border: "1px solid #b8c1ec", padding: 6 }}
                          >
                            {(vmap / totalVmap).toFixed(4)}
                          </td>
                        </tr>
                      )
                    )}
                    <tr style={{ background: "#e3eafc", fontWeight: "bold" }}>
                      <td
                        colSpan={3}
                        style={{
                          border: "1px solid #b8c1ec",
                          padding: 6,
                          textAlign: "right",
                        }}
                      >
                        Hasil
                      </td>
                      <td style={{ border: "1px solid #b8c1ec", padding: 6 }}>
                        {Object.values(res.probabilities)
                          .reduce((a, b) => a + b / totalVmap, 0)
                          .toFixed(4)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <b>Probabilitas Detail:</b>
                <pre
                  style={{
                    background: "#f4f6fb",
                    padding: 10,
                    borderRadius: 8,
                    overflowX: "auto",
                  }}
                >
                  {JSON.stringify(res.probabilities, null, 2)}
                </pre>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export default KlasifikasiPage;
