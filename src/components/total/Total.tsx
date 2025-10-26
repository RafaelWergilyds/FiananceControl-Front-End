import { toBRL } from '../../utils/toBRL';
import styles from './Total.module.css';
import { useMemo } from 'react';
import type { Debit } from '../../models/Debit';

interface TotalProps {
    debits: Debit[];
}

export function Total({ debits }: TotalProps) {

    const total = useMemo(() => {
        return debits.reduce((acc, debit) => debit.value + acc, 0)
    }, [debits])

    return (
        <div className={styles.total}>
            <strong>Total Debits</strong >
            <p>{toBRL(total)}</p>
        </div>
    )
}