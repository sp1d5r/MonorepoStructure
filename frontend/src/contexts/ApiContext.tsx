import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ApiContextType {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiUrl, setApiUrl] = useState<string>(process.env.REACT_APP_API_URL || 'http://localhost:3001');

  return (
    <ApiContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};