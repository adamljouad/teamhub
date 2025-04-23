import { React, useState, useContext, createContext } from 'react'

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const isAuthenticated = !!user;

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:19246/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Errore nel login:', err);
    }
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
