import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTransaction, deleteTransaction, editTransaction, getTransactions,} from "./transactionAPI";

const initialState = {
    transactions: [],
    currentPage: 1,
    totalPage: 0,
    limit: 10,
    isLoading: false,
    isError: false,
    error: "",
    editing: {},
};

// async thunks
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async (queryStr) => {
        return await getTransactions(queryStr);
    }
);

export const createTransaction = createAsyncThunk(
    "transaction/createTransaction",
    async (data) => {
        return await addTransaction(data);
    }
);

export const changeTransaction = createAsyncThunk(
    "transaction/changeTransaction",
    async ({ id, data }) => {
        return await editTransaction(id, data);
    }
);

export const removeTransaction = createAsyncThunk(
    "transaction/removeTransaction",
    async (id) => {
        return await deleteTransaction(id);
    }
);

// create slice
const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state) => {
            state.editing = {};
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload.transactions;
                state.totalPage = Math.ceil(action.payload.totalCount / state.limit);
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactions = [];
            })
            .addCase(createTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.pop();
                state.transactions.unshift(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;

                const indexToUpdate = state.transactions.findIndex(
                    (t) => t.id === action.payload.id
                );

                state.transactions[indexToUpdate] = action.payload;
                state.editing = {};
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                console.log(action);
                state.isError = false;
                state.isLoading = false;

                state.transactions = state.transactions.filter(
                    (t) => t.id !== action.meta.arg
                );
                state.currentPage = 1;
                state.totalPage = Math.ceil(state.transactions.length / state.limit);
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default transactionSlice.reducer;
export const { editActive, editInActive, setCurrentPage } = transactionSlice.actions;
