// (C) 2020 GoodData Corporation
import React, { createContext, useState } from "react";

export interface IIsDateFilterInitialized {
    transactionMonthAndDate: boolean;
    enteredMonthAndDate: boolean;
}

interface IUseTransactionDateContext {
    useTransactionDate: boolean;
    setUseTransactionDate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UseTransactionDateContext = createContext<IUseTransactionDateContext>({} as any);

export const UseTransactionDateContextProvider: React.FC = ({ children }) => {
    const [useTransactionDate, setUseTransactionDate] = useState(false);

    return (
        <UseTransactionDateContext.Provider
            value={{
                useTransactionDate,
                setUseTransactionDate,
            }}
        >
            {children}
        </UseTransactionDateContext.Provider>
    );
};

export const getDateFilter = (useTransactionDate: boolean) =>
    useTransactionDate ? "transactionMonthAndDate" : "enteredMonthAndDate";
