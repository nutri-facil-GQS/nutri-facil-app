import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem('userEmail'));

  const login = (userEmail) => {
    localStorage.setItem('userEmail', userEmail);
    setEmail(userEmail);
  };

  const logout = () => {
    localStorage.removeItem('userEmail');
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);