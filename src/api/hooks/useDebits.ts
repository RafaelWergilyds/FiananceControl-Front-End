import { useCallback, useEffect, useState } from "react"
import { debitService, type Debit } from "../services/debitService"
import { useAuth } from "../../context/AuthHook"

export const useDebits = () => {
    const [data, setData] = useState<Debit[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const auth = useAuth()


    const fetchDebits = useCallback(async () => {
        setLoading(true);
        setError(null)
        try {
            const debits = await debitService.getAll();
            setData(debits.data)
        } catch (error) {
            console.error('Failed to find debits', error)
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        if (auth?.signed) {
            fetchDebits()
        }
    }, [fetchDebits, auth?.signed]);

    return { data, loading, error, refetch: fetchDebits }

}