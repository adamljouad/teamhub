import { React, useState, useContext, createContext } from 'react'

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  const login = (email, password) => {
    // logica simulata di login
    setUser({ email }); // poi lo puoi estendere
  };

  const logout = () => {
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
