import axios from "../../utils/axios";

export const getTransactions = async (queryStr) => {
    const response = await axios.get(`/transactions${queryStr||''}`);
    // console.log(response.headers['x-total-count'])
    const totalCount = +response.headers['x-total-count'] || 0;
    return {transactions: response.data, totalCount};
};

export const addTransaction = async (data) => {
    const response = await axios.post("/transactions", data);
    return response.data;
};

export const editTransaction = async (id, data) => {
    const response = await axios.put(`/transactions/${id}`, data);
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = axios.delete(`/transactions/${id}`);
    return response.data;
};
