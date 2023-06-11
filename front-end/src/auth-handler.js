import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({
        id: "",
        type: ""
    });

    // Check for cookie, if it exists, set isAuthenticated to true
    // and set user to the cookie's value
    useEffect(() => {
        // TODO: implement cookie check
    }, []);

    const login = (email, password) => {
        // TODO: implement login with API
        
        // Mock login
        return new Promise((resolve, reject) => {
            if (email === "admin@example.com" && password === "admin") {
                setIsAuthenticated(true);
                setUser({
                    id: "admin",
                    type: "admin"
                });
                resolve();
            }
            else if (email === "client@example.com" && password === "client") {
                setIsAuthenticated(true);
                setUser({
                    id: "client",
                    type: "client"
                });
                resolve();
            }
            else {
                reject("Credenciais inválidas.");
            }
        });
    }

    const logout = () => {
        // TODO: implement logout with API

        // Mock logout
        return new Promise((resolve, reject) => {
            if(isAuthenticated) {
                setIsAuthenticated(false);
                setUser({
                    id: "",
                    type: ""
                });
                resolve();
            }
            else reject("Usuário não autenticado.");
        });
    }

    const data = {
        isAuthenticated,
        user,
        login,
        logout,
    };
    
    return (
        <AuthContext.Provider value={data} {...props} />
    );
}