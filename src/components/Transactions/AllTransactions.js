import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransactions} from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function AllTransactions() {
    const dispatch = useDispatch();
    const {transactions, currentPage, limit, isLoading, isError} = useSelector((state) => state.transaction);
    const { search, type } = useSelector((state) => state.filter);

    useEffect(() => {
        let queryStr = `?_sort=id&_order=desc&_page=${currentPage}&_limit=${limit}`;
        if(search) queryStr = `${queryStr}&name_like=${search}`;
        if(type) queryStr = `${queryStr}&type=${type}`;
        dispatch(fetchTransactions(queryStr));
    }, [currentPage, dispatch, limit, search, type]);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = <p className="error">There was an error occured</p>;

    if (!isLoading && !isError && transactions?.length > 0) {
        content = transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction}/>
        ));
    }

    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p>No transactions found!</p>;
    }

    return (
        <>
            <h3>Your Transactions:</h3>

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>
        </>
    );
}
