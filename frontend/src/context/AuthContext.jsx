import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Hydrate from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('sh2_auth');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed.user);
                setToken(parsed.token);
            } catch (_) {
                localStorage.removeItem('sh2_auth');
            }
        }
    }, []);

    const login = (data) => {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('sh2_auth', JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('sh2_auth');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
