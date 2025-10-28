import styles from './DebitList.module.css';
import type { Debit as DebitType } from '../../models/Debit';
import { Debit } from './Debit';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { DebitForms } from '../forms/DebitForms';
import { Modal } from '../modal/Modal';

interface DebitListProps {
    debits: DebitType[];
    setDebitList: React.Dispatch<React.SetStateAction<DebitType[]>>;
}

export function DebitList({ debits, setDebitList }: DebitListProps) {
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

    const handleAddDebit = (newDebitData: Omit<DebitType, 'id' | 'moment'>) => {
        const newDebit = {
            ...newDebitData,
            id: debits.length + 1,
            moment: new Date()
        }

        setDebitList((oldDebits) => [
            newDebit,
            ...oldDebits
        ])

        closeModal()
    }

    return (
        <div className={styles.debitListContainer}>
            <div className={styles.title}>
                <h2>Last Debits</h2>
                <button className={styles.addDebitButton} onClick={openModal}><Plus />add debit</button>
                <Modal isOpen={isModalOpen} onClose={closeModal} >
                    <DebitForms formsType='addDebit' addDebit={handleAddDebit} />
                </Modal>
            </div>
            <div className={styles.debitListTableContainer}>
                <table className={styles.debitListTable}>
                    <thead className={styles.theadTable}>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Category</th>
                            <th>Moment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {debits.map((debit) => <Debit debit={debit} deleteDebit={handleDeleteDebit} updateDebit={handleUpdateDebit} key={debit.id} />)}
                    </tbody>
                </table>
            </div>
        </div >
    )

}

