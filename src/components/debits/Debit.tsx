import styles from './Debit.module.css';
import { toBRL } from '../../utils/toBRL.ts';
import { dateFormat } from '../../utils/dateFormat.ts';
import { Edit, Trash2 } from 'lucide-react';
import type { Debit } from '../../models/Debit.ts';
import { useState } from 'react';
import { Modal } from './Modal.tsx';

interface DebitProps {
    debit: Debit
    deleteDebit: (debitToDelete: Debit) => void
}

export function Debit({ debit, deleteDebit }: DebitProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    function handleDeleteDebit() {
        deleteDebit(debit)
    }

    return (
        <tr className={styles.debit}>
            <td>{debit.name}</td>
            <td>{toBRL(debit.value)}</td>
            <td>{debit.category}</td>
            <td>{dateFormat(debit.moment)}</td>
            <td>
                <div className={styles.buttons}>
                    <button className={styles.editButton}><Edit size={24} /></button>
                    <button className={styles.deleteButton} onClick={openModal}><Trash2 size={24} /></button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <div className={styles.sureContent}>
                            <p>Are you sure to delete this debit?</p>
                            <div className={styles.sureButtons}>
                                <button className={styles.yesButton} onClick={handleDeleteDebit}>Yes</button>
                                <button className={styles.noButton} onClick={closeModal}>No</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </td>
        </tr>
    )
}