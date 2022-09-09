import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTransactions,} from "./balanceAPI";

const initialState = {
    transactions: [],
};

// async thunks
export const fetchBalance = createAsyncThunk(
    "balance/fetchBalance",
    async (queryStr) => {
        return await getTransactions(queryStr);
    }
);

// create slice
const balanceSlice = createSlice({
    name: "balance",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactions = [];
            })
    },
});

export default balanceSlice.reducer;
