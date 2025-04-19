import { React, useState, useContext, createContext } from 'react'

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const isAuthenticated = !!user;

  const login = (email, password) => {
    setUser({ email });
    localStorage.setItem('user', JSON.stringify({email}));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);


export { AuthProvider, useAuth };
