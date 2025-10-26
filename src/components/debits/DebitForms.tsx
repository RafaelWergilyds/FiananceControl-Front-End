import { Plus } from "lucide-react"
import styles from './DebitForms.module.css'
import { ChangeEvent, FormEvent, useState } from "react";
import type { Debit } from "../../models/Debit";

interface DebitFormsProps {
    addDebit: (debit: Omit<Debit, 'id' | 'moment'>) => void;
}

const formatToBRL = (valueInCents: number) => {
    const value = valueInCents / 100;
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function DebitForms({ addDebit }: DebitFormsProps) {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [valueInCents, setValueToCents] = useState(0);
    const [valueFormatted, setValueFormatted] = useState(formatToBRL(0))

    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const valueInput = e.target.value;
        const digits = valueInput.replace(/\D/g, '')
        const valueCents = parseInt(digits, 10) || 0
        setValueToCents(valueCents)
        setValueFormatted(formatToBRL(valueCents))
    }

    const handleAddDebit = (event: FormEvent) => {
        event.preventDefault()
        addDebit({
            name: name,
            value: valueInCents / 100,
            category: category
        })

        setName('')
        setValueToCents(0)
        setCategory('')
        setValueFormatted(formatToBRL(0))
    }

    return (
        <form onSubmit={handleAddDebit}>
            <h2>Add Debit</h2>
            <div className={styles.formsBody}>
                <label>Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)}></input>
                <label>Amount</label>
                <input type="text" required value={valueFormatted} onChange={handleChangePrice}></input>
                <label>Category</label>
                <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)}></input>
            </div>
            <button type="submit" className={styles.addButton}><Plus /> add debit</button>
        </form>
    )
}