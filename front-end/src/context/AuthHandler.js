import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// IMPORTANT: This is a mock implementation of the AuthHandler.
// In Milestone 3, this will be replaced by a cookie-based implementation.
// Functions login and logout will be replaced by API calls.
// Implementations for user signup and password recovery will be added.
export const AuthProvider = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({
        id: "",
        type: "",
        name: ""
    });

    // Check if user is in local storage on first render,
    // if it is, load it into state
    useEffect(() => {
        getUser();
    }, []);

    // Save user to local storage
    const saveUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    }
    
    // Remove user from local storage
    const removeUser = () => {
        localStorage.removeItem("user");
    }

    // Get user from local storage and update state
    const getUser = () => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
            setIsAuthenticated(true);
        }
        else {
            setUser({});
            setIsAuthenticated(false);
        }
    }

    const mockUsers = [
        {
            email: "admin@example.com",
            password: "adminadmin",
            userData: {
                id: "64a5f1616d410b5ed08013d5",
                type: "admin",
                name: "Administrador Teste"
            }
        },
        {
            email: "client@example.com",
            password: "clientclient",
            userData: {
                id: "649ddb66a8a256d0930d7a77",
                type: "client",
                name: "Cliente Teste"
            }
        }
    ];

    const login = (email, password) => {
        // TODO: implement login with API
        
        // Mock login
        return new Promise((resolve, reject) => {
            if(isAuthenticated) {
                reject("Usuário já autenticado.");
            }

            for(const user of mockUsers) {
                if (email === user.email && password === user.password) {
                    setIsAuthenticated(true);
                    setUser(user.userData);
                    saveUser(user.userData);
                    resolve();
                }
            }

            reject("Credenciais inválidas.");
        });
    }

    const logout = () => {
        // TODO: implement logout with API

        // Mock logout
        return new Promise((resolve, reject) => {
            if(isAuthenticated) {
                removeUser();
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