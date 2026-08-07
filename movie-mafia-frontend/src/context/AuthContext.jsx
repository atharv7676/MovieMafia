import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  

  const checkAuth = async () => {
    try {
      const response  = await getCurrentUser()
        setUser(response.user);
        setIsAuthenticated(true);
        setLoading(false);
    } catch (error) {
      setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    checkAuth,
  };


  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
export const useAuth = () => useContext(AuthContext);
