import axios from "../../utils/axios";

export const getTransactions = async () => {
    const response = await axios.get(`/transactions`);
    return response.data;
};
