import { X } from 'lucide-react'
import styles from './Modal.module.css'
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {

    useEffect(() => {
        function handleEsc(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}><X /></button>
                {children}
            </div>
        </div >
    )
}