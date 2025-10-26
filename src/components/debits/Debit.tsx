import styles from './Debit.module.css';
import { toBRL } from '../../utils/toBRL.ts';
import { dateFormat } from '../../utils/dateFormat.ts';
import { Edit, Trash2 } from 'lucide-react';
import type { Debit } from '../../models/Debit.ts';

export function Debit(debit: Debit) {
    return (
        <tr className={styles.debit}>
            <td>{debit.name}</td>
            <td>{toBRL(debit.value)}</td>
            <td>{debit.category}</td>
            <td>{dateFormat(debit.moment)}</td>
            <td>
                <div className={styles.buttons}>
                    <button className={styles.editButton}><Edit size={24} /></button>
                    <button className={styles.deleteButton}><Trash2 size={24} /></button>
                </div>
            </td>
        </tr>
    )
}