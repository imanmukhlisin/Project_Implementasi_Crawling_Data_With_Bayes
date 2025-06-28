import React, { createContext, useContext, useState } from 'react';

const DataPipelineContext = createContext();

export function DataPipelineProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [preprocessed, setPreprocessed] = useState([]);
  const [features, setFeatures] = useState(null);
  const [klasifikasi, setKlasifikasi] = useState([]);

  return (
    <DataPipelineContext.Provider value={{
      tweets, setTweets,
      preprocessed, setPreprocessed,
      features, setFeatures,
      klasifikasi, setKlasifikasi
    }}>
      {children}
    </DataPipelineContext.Provider>
  );
}

export function useDataPipeline() {
  return useContext(DataPipelineContext);
}