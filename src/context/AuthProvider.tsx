import { useEffect, useState, type ReactNode } from "react"
import { AuthContext, type User } from "./AuthContext"
import { api } from "../api/api"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = localStorage.getItem('@FinanceControl:user');
            const storagedToken = localStorage.getItem('@FinanceControl:token');

            if (storagedUser && storagedToken) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
                setUser(jwtDecode<User>(storagedToken));
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(email: string, password: string) {
        try {
            const response = await api.post('/auth/login', { email, password })

            const { accessToken } = response.data;

            const user = jwtDecode<User>(accessToken)

            setUser(user)
            localStorage.setItem('@FinanceControl:token', accessToken)
            navigate('/painel')
        } catch (error) {
            return console.error("login error", error)
        }
    }

    const signOut = () => {
        localStorage.clear()
        setUser(null)
        navigate("/login")
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
