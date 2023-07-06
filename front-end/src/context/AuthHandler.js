import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({
        name: "",
        type: "",
    });

    // Check if user is authenticated, if so, get user from api
    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        if(authenticated) {
            setIsAuthenticated(true);
            getUser().catch(() => {});
        }
    }, []);

    // Get user from api and set it to user state
    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.get("/auth/me");
                const { user } = response.data;
                setUser(user);
                setIsAuthenticated(true);
                resolve(user);
            } 
            catch (error) {
                // If user is not authenticated, localStorage will be cleared
                if(error.response?.status === 401) {
                    setIsAuthenticated(false);
                    localStorage.removeItem("authenticated");
                }

                reject("Erro ao obter usuário.");
            }
        });
    }

    const getUserDetails = () => {
        return new Promise(async (resolve, reject) => {
            if(!isAuthenticated) reject("Usuário não autenticado.");

            try {
                const response = await api.get("/auth/me?details=full")
                const { user } = response.data;
                resolve(user);
            }
            catch (error) {
                reject("Erro ao obter detalhes do usuário.");
            }
        });
    };

    const updateUser = (userData) => {
        return new Promise(async (resolve, reject) => {
            if(!isAuthenticated) reject("Usuário não autenticado.");

            try {
                const response = await api.put("/auth/me", userData);
                const { user } = response.data;
                setUser({
                    name: user.name,
                    type: user.type,
                });
                resolve(user);
            }
            catch (error) {
                reject("Erro ao atualizar usuário.");
            }
        });
    };

    const login = (email, password) => {
        return new Promise(async (resolve, reject) => {
            if(isAuthenticated) reject("Usuário já autenticado.");
            
            try {
                const response = await api.post("/auth/login", {
                    email,
                    password
                });
                const { user } = response.data;

                setUser(user);
                setIsAuthenticated(true);
                localStorage.setItem("authenticated", true);

                resolve();
            } 
            catch (error) {
                if(error.reponse?.status === 401) {
                    reject("Usuário ou senha inválidos.");
                }
                else {
                    reject("Erro ao realizar login.");
                }
            }
        });
    };

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            if(!isAuthenticated) reject("Usuário não autenticado.");

            try {
                await api.post("/auth/logout");
                setUser({
                    name: "",
                    type: "",
                });
                setIsAuthenticated(false);
                localStorage.removeItem("authenticated");
                resolve();
            }
            catch (error) {
                reject("Erro ao realizar logout.");
            }
        });
    };

    const register = (userData) => {
        return new Promise(async (resolve, reject) => {
            if(isAuthenticated) reject("Usuário já autenticado.");

            try {
                await api.post("/auth/register", userData);
                resolve();
            }
            catch (error) {
                if(error.response?.status === 409) {
                    reject("Usuário já cadastrado.");
                }
                else {
                    reject("Erro ao realizar cadastro.");
                }
            }
        });
    };

    const data = {
        isAuthenticated,
        user,
        login,
        logout,
        register,
        getUserDetails,
        updateUser,
    };
    
    return (
        <AuthContext.Provider value={data} {...props} />
    );
}