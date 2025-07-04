import React from "react";
import { useDataPipeline } from "./DataPipelineContext";

function PilihSentimenPage() {
  const { klasifikasi } = useDataPipeline();

  // Cari tweet dengan probabilitas sentimen tertinggi dari semua tweet
  let maxProb = -1;
  let bestTweet = null;
  let bestClass = "";
  let bestIdx = -1;

  klasifikasi.forEach((res, idx) => {
    // Ambil probabilitas tertinggi dari tweet ini
    const [kelas, prob] = Object.entries(res.probabilities).reduce(
      (a, b) => (a[1] > b[1] ? a : b)
    );
    if (prob > maxProb) {
      maxProb = prob;
      bestTweet = res;
      bestClass = kelas;
      bestIdx = idx;
    }
  });

  return (
    <div className="card">
      <h2>Tweet dengan Probabilitas Sentimen Tertinggi</h2>
      {bestTweet ? (
        <div
          style={{
            background: "#f4f6fb",
            border: "1.5px solid #1976d2",
            borderRadius: 10,
            padding: "18px 22px",
            marginBottom: 0,
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.06)",
            fontSize: "1rem",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#1976d2", marginBottom: 6 }}>
            Tweet #{bestIdx + 1}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Tweet:</b> {bestTweet.clean_tweet}
          </div>
          <div style={{ marginBottom: 6 }}>
            <b>Probabilitas:</b>{" "}
            {Object.entries(bestTweet.probabilities)
              .map(([k, v]) => `${k}: ${v.toFixed(4)}`)
              .join(", ")}
          </div>
          <div>
            <b>Sentimen Terpilih:</b>{" "}
            <span style={{ color: "#1976d2", fontWeight: "bold" }}>
              {bestClass} ({maxProb.toFixed(4)})
            </span>
          </div>
        </div>
      ) : (
        <div>Belum ada data klasifikasi.</div>
      )}
      <p style={{ color: "#1976d2", fontWeight: "bold", marginTop: 24 }}>
        Ini adalah tweet dengan probabilitas sentimen tertinggi dari seluruh data crawling.
      </p>
    </div>
  );
}

export default PilihSentimenPage;