import { Plus } from "lucide-react"
import styles from './DebitForms.module.css'
import React, { useState } from "react";
import type { Debit } from '../../models/Debit';

interface DebitFormsProps {
    formsType: string;
    initialDebit?: Debit;
    updateDebit?: (debit: Debit) => void;
    addDebit?: (debit: { name: string, value: number, category: string }) => void;
    onCloseModal?: () => void;
}

export function DebitForms({ addDebit, updateDebit, formsType, initialDebit, onCloseModal }: DebitFormsProps) {
    const [name, setName] = useState(initialDebit?.name || '')
    const [category, setCategory] = useState(initialDebit?.category || '')
    const [valueInCents, setValueToCents] = useState(initialDebit ? initialDebit.value * 100 : 0);

    const formatToBRL = (valueInCents: number) => {
        const value = valueInCents / 100;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueInput = event.target.value;
        const digits = valueInput.replace(/\D/g, '')
        const valueCents = parseInt(digits, 10) || 0
        setValueToCents(valueCents)

    }
    const valueFormated = formatToBRL(valueInCents)

    const handleUpdateDebit = (event: React.FormEvent) => {
        event.preventDefault()
        if (initialDebit) {
            updateDebit?.({
                ...initialDebit,
                name: name,
                value: valueInCents / 100,
                category: category
            })
        }
        onCloseModal?.()
    }

    const handleAddDebit = (event: React.FormEvent) => {
        event.preventDefault()
        addDebit?.({
            name: name,
            value: valueInCents / 100,
            category: category
        })

        setName('')
        setValueToCents(0)
        setCategory('')
        onCloseModal?.()
    }

    return (
        <>
            {formsType === 'addDebit' && (
                <form onSubmit={handleAddDebit}>
                    <h2>Add Debit</h2>
                    <div className={styles.formsBody}>
                        <label>Name</label>
                        <input type="text" required value={name} onChange={(event) => setName(event.target.value)}></input>
                        <label>Amount</label>
                        <input type="text" required value={valueFormated} onChange={handleChangePrice}></input>
                        <label>Category</label>
                        <input type="text" required value={category} onChange={(event) => setCategory(event.target.value)}></input>
                    </div>
                    <button type="submit" className={styles.submitButton}><Plus /> add debit</button>
                </form>
            )}
            {formsType === 'editDebit' && (
                <form onSubmit={handleUpdateDebit}>
                    <h2>Edit Debit</h2>
                    <div className={styles.formsBody}>
                        <label>Name</label>
                        <input type="text" required value={name} onChange={(event) => setName(event.target.value)}></input>
                        <label>Amount</label>
                        <input type="text" required value={valueFormated} onChange={handleChangePrice}></input>
                        <label>Category</label>
                        <input type="text" required value={category} onChange={(event) => setCategory(event.target.value)}></input>
                    </div>
                    <button type="submit" className={styles.submitButton}><Plus /> confirm</button>
                </form>
            )}
        </>
    )
}