import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import styles from './DefaultLayout.module.css'

export function DefaultLayout() {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}