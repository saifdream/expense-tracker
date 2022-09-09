import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    search: '',
    type: ''
};

// create slice
const transactionFilterSlice = createSlice({
    name: "transactionFilter",
    initialState,
    reducers: {
        setTransactionSearch: (state, action) => {
            state.search = action.payload;
        },
        setTransactionType: (state, action) => {
            state.type = action.payload;
        },
        resetTransactionFilter: (state, action) => {
            state.search = "";
            state.type = "";
        }
    },
});

export default transactionFilterSlice.reducer;
export const { setTransactionSearch, setTransactionType, resetTransactionFilter } = transactionFilterSlice.actions;
