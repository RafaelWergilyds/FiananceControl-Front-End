import styles from './Total.module.css';
import { useEffect, useMemo, useRef } from 'react';
import type { Debit } from '../../models/Debit';
import CountUp from 'react-countup';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TotalProps {
    debits: Debit[];
}

export function Total({ debits }: TotalProps) {

    const actualDate = new Date();
    const actualMonth = format(actualDate, 'MMMM', { locale: ptBR })

    const total = useMemo(() => {
        return debits.reduce((acc, debit) => debit.amount + acc, 0)
    }, [debits])

    const oldValue = useRef(0)

    useEffect(() => {
        oldValue.current = total;
    }, [total])

    return (
        <>
            <div className={`${styles.total} fade-in-up`}>
                <h1>
                    <strong>{actualMonth}</strong>
                </h1>
                <p>
                    R$ <CountUp start={oldValue.current} end={total} duration={0.5} separator='.' decimal=',' decimals={2} />
                </p>
            </div>
        </>
    )
}