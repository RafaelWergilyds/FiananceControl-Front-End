import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthHook'

export function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const auth = useAuth();
    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        auth!.signIn(email, password)
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