import styles from './Debit.module.css';
import { toBRL } from '../../utils/toBRL.ts';
import { dateFormat } from '../../utils/dateFormat.ts';
import { Edit, Trash2 } from 'lucide-react';
import type { Debit } from '../../models/Debit.ts';
import { useState } from 'react';
import { Modal } from '../modal/Modal.tsx';
import { DebitForms } from '../forms/DebitForms.tsx';
import type { Category } from '../../models/Category.ts';

interface DebitProps {
    debit: Debit
    categories: Category[]
    updateDebit: (debitToUpadate: Debit) => void
    deleteDebit: (debitToDelete: Debit) => void
}

type ModalName = 'editButton' | 'deleteButton' | null

export function Debit({ debit, categories, deleteDebit, updateDebit }: DebitProps) {

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

    const category = categories.find(category => category.id === debit.categoryId)
    const categoryName = category ? category.name : 'Sem categoria';

    function handleDeleteDebit() {
        deleteDebit(debit)
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {activeModal === 'editButton' && (
                    <DebitForms formsCategory='EDIT' initialDebit={debit} categories={categories} updateDebit={updateDebit} onCloseModal={closeModal} />
                )}
                {activeModal === 'deleteButton' && (
                    <div className={styles.confirmationContent}>
                        <p>Tem certeza que deseja excluir este débito?</p>
                        <div className={styles.confirmationButtons}>
                            <button className={styles.yesButton} onClick={handleDeleteDebit}>Yes</button>
                            <button className={styles.noButton} onClick={closeModal}>No</button>
                        </div>
                    </div>
                )}
            </Modal>
            <div className={styles.debit}>
                <div className={styles.debitName}>
                    <p>{debit.name}</p>
                </div>
                <div className={styles.debitInfo}>
                    <p className={styles.value}>{toBRL(debit.value)}</p>
                    <p>{categoryName}</p>
                    <p>{dateFormat(debit.moment)}</p>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.editButton} onClick={() => openModal('editButton')}><Edit size={24} /></button>
                    <button className={styles.deleteButton} onClick={() => openModal('deleteButton')}><Trash2 size={24} /></button>
                </div>
            </div>
        </>
    )
}