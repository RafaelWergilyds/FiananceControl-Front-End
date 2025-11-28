import { Plus } from "lucide-react"
import styles from './DebitForms.module.css'
import React, { useState } from "react";
import type { Debit } from '../../models/Debit';
import type { Category } from "../../models/Category";

type FormsCategory = "CREATE" | "EDIT";

interface DebitFormsProps {
    formsCategory: FormsCategory;
    initialDebit?: Debit;
    categories: Category[]
    updateDebit?: (debit: Debit) => void;
    addDebit?: (debit: { name: string, value: number, categoryId: number | null }) => void;
    onCloseModal?: () => void;
}

export function DebitForms({ categories, addDebit, updateDebit, formsCategory, initialDebit, onCloseModal }: DebitFormsProps) {
    const [name, setName] = useState(initialDebit?.name || '')
    const [categoryId, setCategoryId] = useState(initialDebit?.categoryId ?? null)
    const [valueInCents, setValueToCents] = useState(initialDebit ? initialDebit.value * 100 : 0);
    const isNewDebitNameEmpty = name.length === 0;

    function formatToBRL(valueInCents: number) {
        const value = valueInCents / 100;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    function handleChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        const valueInput = event.target.value;
        const digits = valueInput.replace(/\D/g, '')
        const valueCents = parseInt(digits, 10) || 0
        setValueToCents(valueCents)

    }
    const valueFormated = formatToBRL(valueInCents)

    function handleUpdateDebit(event: React.FormEvent) {
        event.preventDefault()
        if (initialDebit) {
            updateDebit?.({
                ...initialDebit,
                name: name,
                value: valueInCents / 100,
                categoryId: categories.find(category => category.id === categoryId)?.id || initialDebit.categoryId || null
            })
        }
        onCloseModal?.()
    }

    function handleAddDebit(event: React.FormEvent) {
        event.preventDefault()
        addDebit?.({
            name: name,
            value: valueInCents / 100,
            categoryId: categories.find(category => category.id === categoryId)?.id || null
        })

        setName('')
        setValueToCents(0)
        setCategoryId(0)
        onCloseModal?.()
    }

    function handleTextInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setName(event.target.value)
    }

    function handleNewDebitInvalid(event: React.InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Campo obrigatório!')
    }

    return (
        <>
            {formsCategory === 'CREATE' && (
                <form className={styles.debitForms} onSubmit={handleAddDebit}>
                    <h2>Adicionar Débito</h2>
                    <div className={styles.formsBody}>
                        <label>Nome</label>
                        <input type="text" required value={name} onChange={handleTextInput} onInvalid={handleNewDebitInvalid}></input>
                        <label>Valor</label>
                        <input type="text" required value={valueFormated} onChange={handleChangePrice} onInvalid={handleNewDebitInvalid}></input>
                        <label>Categoria</label>
                        <select className={styles.selectCategory} value={categoryId ?? ""} onChange={(event) => setCategoryId(Number(event.target.value))}>
                            <option value="">Sem Categoria</option>
                            {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={isNewDebitNameEmpty}><Plus /> add debit</button>
                </form>
            )}
            {formsCategory === 'EDIT' && (
                <form className={styles.debitForms} onSubmit={handleUpdateDebit}>
                    <h2>Atualizar Débito</h2>
                    <div className={styles.formsBody}>
                        <label>Nome</label>
                        <input type="text" required value={name} onChange={(event) => setName(event.target.value)} onInvalid={handleNewDebitInvalid}></input>
                        <label>Valor</label>
                        <input type="text" required value={valueFormated} onChange={handleChangePrice} onInvalid={handleNewDebitInvalid}></input>
                        <label>Categoria</label>
                        <select className={styles.selectCategory} value={categoryId ?? ""} onChange={(event) => setCategoryId(Number(event.target.value))}>
                            {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={isNewDebitNameEmpty}><Plus />confirm</button>
                </form>
            )}
        </>
    )
}