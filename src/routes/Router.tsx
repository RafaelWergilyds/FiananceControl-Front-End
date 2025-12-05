import { Routes, Route } from "react-router-dom";
import { Painel } from "../components/painel/Painel";
import { DebitList } from "../components/debits/DebitList";
import { Categories } from "../components/categories/Categories";
import { Settings } from "../components/settings/Settings";
import type { Debit } from "../api/services/debitService";
import type { Category } from "../models/Category";
import { Total } from "../components/total/Total";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Login } from "../components/authentication/Login";
import { Register } from "../components/authentication/Register";
import { PrivateRoutes } from "./PrivateRoutes";
import { useState, useEffect } from "react";
import { useDebits } from "../api/hooks/useDebits";
import { mockCategories } from "../mockCategories";



export function Router() {
    const debits = useDebits();
    const [debitsList, setDebitsList] = useState<Debit[]>([])

    useEffect(() => {
        setDebitsList(debits.data.map(debit => ({ ...debit, moment: new Date(debit.moment) })))
    }, [debits.data])


    const [categoriesList] = useState<Category[]>(mockCategories)

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/painel" element={<Painel />} />
                    <Route path="/debits" element={<>
                        <Total debits={debitsList} />
                        <DebitList debits={debitsList} categories={categoriesList} setDebitList={setDebitsList} />
                    </>} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Route>
        </Routes>
    )
}