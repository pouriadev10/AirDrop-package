// src/ConfigContext.js
import React, { createContext, useContext } from 'react';
import { defaultConfig } from './defaultConfig';

const ConfigContext = createContext();

export const ConfigProvider = ({ children, config = defaultConfig }) => {

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
