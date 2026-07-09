import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getMe } from '../types/auth';
import type { User } from '../types/types';

interface AuthContextValue {
    user: User | null;
    token: string | null;
    loading: boolean;
    setToken: (token: string) => Promise<void>;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const refreshUser = useCallback(async () => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken) {
            setUser(null);
            setLoading(false);
            return;
        } try {
            const me = await getMe();
            setUser(me);
            localStorage.setItem('user', JSON.stringify(me));
        } catch {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        } }, []);

        useEffect(() => {
            refreshUser();
        }, []);

        const setToken = useCallback(async (newToken: string) => {
            localStorage.setItem('token', newToken);
            setTokenState(newToken);
            setLoading(true);
            await refreshUser();}, [refreshUser]);

        const logout = useCallback(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setTokenState(null);
        }, []);

        return (
            <AuthContext.Provider value={{ user, token, loading, setToken, refreshUser, logout }}>
                {children}
            </AuthContext.Provider>
        );
    }  
    export function useAuth():AuthContextValue {
        const context = useContext(AuthContext);
        if (!context) {
            throw new Error('useAuth debe usarse dentor de AuthProvider');
        }
        return context;
    }
