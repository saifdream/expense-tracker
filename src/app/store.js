import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transaction/transactionSlice";
import balanceReducer from "../features/balance/balanceSlice";
import transactionFilterReducer from "../features/filter/transactionFilterSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionReducer,
        balance: balanceReducer,
        filter: transactionFilterReducer,
    },
});
