import { Routes, Route } from "react-router-dom";
import { Painel } from "../components/painel/Painel";
import { DebitList } from "../components/debits/DebitList";
import { Categories } from "../components/categories/Categories";
import { Settings } from "../components/settings/Settings";
import type { Debit } from "../models/Debit";
import type { Category } from "../models/Category";
import { Total } from "../components/total/Total";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Login } from "../components/authentication/Login";
import { Register } from "../components/authentication/Register";
import { PrivateRoutes } from "./PrivateRoutes";

interface RouterProps {
    debitsList: Debit[]
    categoriesList: Category[]
    setDebitsList: React.Dispatch<React.SetStateAction<Debit[]>>
}

export function Router({ debitsList, categoriesList, setDebitsList }: RouterProps) {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<DefaultLayout />}>
                <Route element={<PrivateRoutes />}>
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