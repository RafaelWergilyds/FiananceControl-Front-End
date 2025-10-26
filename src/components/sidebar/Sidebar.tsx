import { Settings, Wallet, Shapes, LayoutDashboard } from 'lucide-react'
import financeControllogo from '../../assets/finance-control-logo.svg'
import styles from './Sidebar.module.css'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
                <img src={financeControllogo}></img>
                <h2 className={styles.sidebarName}>FinanceControl</h2>
            </div>
            <button><LayoutDashboard />Painel</button>
            <button><Wallet />Debits</button>
            <button><Shapes />Categories</button>
            <button><Settings />Settings</button>
        </aside >
    )
}