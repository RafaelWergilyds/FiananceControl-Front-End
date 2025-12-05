import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import { api } from '../../api/api'
import { useEffect, useState } from 'react'

export function Register() {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        localStorage.removeItem('accessToken');
    }, []);

    const navigate = useNavigate()

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            await api.post('/users', { name, email, password })
            navigate('/login')
        } catch (error) {
            console.error('register error Error', error)
        }
    }
    return (
        <div className={styles.registerPage}>
            <div className={styles.registerContainer}>
                <h1>Cadastro</h1>
                <form onSubmit={handleRegister}>
                    <label >nome</label>
                    <input required id='name' value={name} onChange={(event) => setName(event.target.value)}></input>
                    <label>email</label>
                    <input required id='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
                    <label>password</label>
                    <input required id='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    <button type='submit'>Cadastrar</button>
                </form>
                <Link to='/login'>Já possui uma conta?</Link>
            </div>
        </div>
    )
}