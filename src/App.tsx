import { useState } from 'react'
import './global.css'
import { mockDebits } from './mockDebits'
import type { Debit } from './models/Debit'
import { mockCategories } from './mockCategories'
import type { Category } from './models/Category'
import { Router } from './routes/Router'
import { AuthProvider } from './context/AuthProvider'

export function App() {
  const [debitsList, setDebitsList] = useState<Debit[]>(mockDebits.map(debit => ({ ...debit, moment: new Date(debit.moment) })))
  const [categoriesList] = useState<Category[]>(mockCategories)

  return (
    <>
      <AuthProvider>
        <Router debitsList={debitsList} categoriesList={categoriesList} setDebitsList={setDebitsList}>
        </Router>
      </AuthProvider>
    </>
  )
}