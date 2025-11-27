import { CircleUser, LogOut } from 'lucide-react';
import styles from './Header.module.css';
import financeControlLogo from '../../assets/finance-control-logo.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <img src={financeControlLogo}></img>
                <h2 >FinanceControl</h2>
            </div>
            <div className={styles.button}>
                <button className={styles.profileButton}><CircleUser /></button>
                <button className={styles.logoutButton}><LogOut />Sair</button>
            </div>
        </header>
    );
}