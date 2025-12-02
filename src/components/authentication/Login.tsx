import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'

export function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('accessToken');
    }, []);

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const response = await api.post('/auth/login', { email, password })

            const { token } = response.data;

            localStorage.setItem('accessToken', token)

            navigate('/painel')

        } catch (error) {
            console.error('Login Error', error)
        }
    }


    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <h1>FinanceControl</h1>
                <form onSubmit={handleLogin}>
                    <label>email</label>
                    <input required id='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    <label>password</label>
                    <input required id='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    <button type='submit'>Entrar</button>
                </form>
                <Link to='/register'>Crie uma conta</Link>
            </div>
        </div>
    )
}