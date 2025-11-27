import { useState } from 'react'
import './global.css'
import { mockDebits } from './mockDebits'
import type { Debit } from './models/Debit'
import { mockCategories } from './mockCategories'
import type { Category } from './models/Category'
import { Router } from './Router'

export function App() {
  const [debitsList, setDebitsList] = useState<Debit[]>(mockDebits.map(debit => ({ ...debit, moment: new Date(debit.moment) })))
  const [categoriesList] = useState<Category[]>(mockCategories)

  return (
    <>
      <Router debitsList={debitsList} categoriesList={categoriesList} setDebitsList={setDebitsList}>
      </Router>
    </>
  )
}