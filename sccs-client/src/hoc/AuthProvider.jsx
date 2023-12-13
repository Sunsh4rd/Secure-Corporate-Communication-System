import { createContext, useState } from 'react';
import {getTasks} from "../api/tasks";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signin = (newUser, cb) => {
        setUser(newUser);
        cb();
    }
    const signout = (cb) => {
        setUser(null);
        cb();
    }

    if (sessionStorage.getItem('access_token')) {
        getTasks();
    }

    const value = { user, signin, signout }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}
