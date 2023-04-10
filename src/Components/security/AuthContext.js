import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const login = (username, password) => {
        if (username == 'arato' && password == 'password') {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }
    const logout = () => {
        setAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{
            isAuthenticated, setAuthenticated, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}