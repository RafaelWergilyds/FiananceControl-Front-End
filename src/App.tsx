import { useState } from 'react'
import styles from './App.module.css'
import './global.css'
import { mockDebits } from './mockDebits'
import { Sidebar } from './components/sidebar/Sidebar'
import { DebitList } from './components/debits/DebitList'
import { Header } from './components/header/Header'
import { Total } from './components/total/Total'
import type { Debit } from './models/Debit'

export function App() {
  const [debitsList, setDebitsList] = useState<Debit[]>(mockDebits.map(debit => ({ ...debit, moment: new Date(debit.moment) })))

  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Header />
          <Total debits={debitsList} />
          <br></br>
          <DebitList debits={debitsList} setDebitList={setDebitsList} />
        </main>
      </div>
    </>
  )
}