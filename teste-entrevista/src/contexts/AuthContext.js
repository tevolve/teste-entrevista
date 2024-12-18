// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
export const AuthContext = createContext();

// Provedor de contexto
export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(null); // Exemplo de estado de login

  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
