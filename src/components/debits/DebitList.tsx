import styles from './DebitList.module.css';
import { debitService, type Debit as DebitType } from '../../api/services/debitService';
import { Debit } from './Debit';
import { BanknoteArrowDown, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { DebitForms } from '../forms/DebitForms';
import { Modal } from '../modal/Modal';
import type { Category } from '../../models/Category';
interface DebitListProps {
    debits: DebitType[];
    categories: Category[];
    setDebitList: React.Dispatch<React.SetStateAction<DebitType[]>>;
}

export function DebitList({ debits, categories, setDebitList }: DebitListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleDeleteDebit = (debitToDelete: DebitType) => {
        const debitsWithoutDeleteOne = debits.filter(debit => {
            return debit != debitToDelete
        })

        setDebitList(debitsWithoutDeleteOne)
    }

    const handleUpdateDebit = (debitToUpdate: DebitType) => {
        setDebitList(currentDebits => currentDebits.map(debit => debit.id === debitToUpdate.id ? debitToUpdate : debit))
    };

    const handleAddDebit = async (newDebitData: Omit<DebitType, 'id' | 'moment'>) => {

        try {
            const newDebit = await debitService.create(newDebitData)
            setDebitList((oldDebits) => [
                newDebit,
                ...oldDebits
            ])
        } catch (error) {
            console.log(error)
        }

        closeModal()
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} >
                <DebitForms formsCategory='CREATE' categories={categories} addDebit={handleAddDebit} />
            </Modal>
            <div className={`${styles.debitListContainer} fade-in-up`}>
                <div className={styles.title}>
                    <h2><BanknoteArrowDown size={32} />Débitos</h2>
                    <form className={styles.searchForm}>
                        <Search /><input type="search" placeholder='Pesquisar' required />
                    </form>
                    <button className={styles.addDebitButton} onClick={openModal}><Plus />Adicionar Débito</button>
                </div>
                <div className={styles.debitListTableContainer}>
                    {debits.map((debit) => <Debit debit={debit} categories={categories} deleteDebit={handleDeleteDebit} updateDebit={handleUpdateDebit} key={debit.id} />)}
                </div>
            </div >
        </>
    )

}

