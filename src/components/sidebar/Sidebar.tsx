import { Settings, Wallet, Shapes, LayoutDashboard } from 'lucide-react'
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.navButtons}>
                <Link to="/painel"><LayoutDashboard />Painel</Link>
                <Link to="/debits"><Wallet />Débitos</Link>
                <Link to="/categories"><Shapes />Categorias</Link>
                <Link to="/settings"><Settings />Configurações</Link>
            </div>
        </aside >
    )
}