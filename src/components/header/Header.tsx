import { CircleUser, LogOut } from 'lucide-react';
import styles from './Header.module.css';
export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.button}>
                <button className={styles.profileButton}><CircleUser /></button>
                <button className={styles.logoutButton}><LogOut />Logout</button>
            </div>
        </header>
    );
}