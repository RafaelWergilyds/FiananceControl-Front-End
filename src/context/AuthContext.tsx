import { createContext } from "react";

export interface User {
    sub: string;
    name: string;
    email: string;
    role: string;
    exp: number;
}

export interface AuthContextType {
    signed: boolean;
    user: User | null;
    signIn: (name: string, email: string) => void;
    signOut: () => void;
    loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);