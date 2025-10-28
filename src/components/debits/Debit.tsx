import styles from './Debit.module.css';
import { toBRL } from '../../utils/toBRL.ts';
import { dateFormat } from '../../utils/dateFormat.ts';
import { Edit, Trash2 } from 'lucide-react';
import type { Debit } from '../../models/Debit.ts';
import { useState } from 'react';
import { Modal } from '../modal/Modal.tsx';
import { DebitForms } from '../forms/DebitForms.tsx';

interface DebitProps {
    debit: Debit
    updateDebit: (debitToUpadate: Debit) => void
    deleteDebit: (debitToDelete: Debit) => void
}

type ModalName = 'editButton' | 'deleteButton' | null

export function Debit({ debit, deleteDebit, updateDebit }: DebitProps) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeModal, setActiveModal] = useState<ModalName>(null)

    const openModal = (modal: ModalName) => {
        setActiveModal(modal)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setActiveModal(null)
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
                    <button className={styles.editButton} onClick={() => openModal('editButton')}><Edit size={24} /></button>
                    <button className={styles.deleteButton} onClick={() => openModal('deleteButton')}><Trash2 size={24} /></button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        {activeModal === 'editButton' && (
                            <DebitForms formsType='editDebit' initialDebit={debit} updateDebit={updateDebit} onCloseModal={closeModal} />
                        )}
                        {activeModal === 'deleteButton' && (
                            <div className={styles.confirmationContent}>
                                <p>Are you sure to delete this debit?</p>
                                <div className={styles.confirmationButtons}>
                                    <button className={styles.yesButton} onClick={handleDeleteDebit}>Yes</button>
                                    <button className={styles.noButton} onClick={closeModal}>No</button>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </td>
        </tr>
    )
}