import React, {createContext, useContext, ReactNode, useState, useEffect} from 'react';
import {User} from "@my-monorepo/shared/dist/types/User";
import firebase from "firebase/compat";
import FirebaseAuthService from "@my-monorepo/shared/dist/services/authentication/strategies/FirebaseAuthService";

interface AuthState {
    isAuthenticated?: boolean;
    user: null | User;
}

interface AuthContextProps {
    authState: AuthState;
    login: (email: string, password: string, onSuccess?: () => void, onFailure?: (error: firebase.FirebaseError) => void) => void;
    logout: (onSuccess?: () => void, onFailure?: (error: firebase.FirebaseError) => void) => void;
    register: (email: string, name:string, password: string, onSuccess?: () => void, onFailure?: (error: any) => void) => void;
    resetPassword: (email: string, onSuccess?: () => void, onFailure?: (error: any) => void) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({ user: null });

    useEffect(() => {
        const unsubscribe = FirebaseAuthService.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setAuthState({
                    isAuthenticated: true,
                    user: { uid: firebaseUser.uid, name: firebaseUser.name || '', email: firebaseUser.email || '' }
                });
            } else {
                setAuthState({ isAuthenticated: false, user: null });
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string, onSuccess?: () => void, onFailure?: (error: any) => void) => {
        try {
            await FirebaseAuthService.login(email, password);
            if (onSuccess) onSuccess();
        } catch (error) {
            if (onFailure) onFailure(error);
        }
    };

    const register = async (email: string, password: string, name:string, onSuccess?: () => void, onFailure?: (error: any) => void) => {
        try {
            await FirebaseAuthService.register(email, password, name);
            if (onSuccess) onSuccess();
        } catch (error) {
            if (onFailure) onFailure(error);
        }
    };

    const logout = async (onSuccess?: () => void, onFailure?: (error: any) => void) => {
        try {
            await FirebaseAuthService.logout();
            if (onSuccess) onSuccess();
        } catch (error) {
            if (onFailure) onFailure(error);
        }
    };

    const resetPassword = async (email: string, onSuccess?: () => void, onFailure?: (error: any) => void) => {
        try {
            await FirebaseAuthService.resetPassword(email);
            if (onSuccess) onSuccess();
        } catch (error) {
            if (onFailure) onFailure(error);
        }
    };

    return (
      <AuthContext.Provider value={{ authState, login, logout, register, resetPassword }}>
          {children}
      </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
