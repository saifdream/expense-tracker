import {useDispatch, useSelector} from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";
import {useEffect} from "react";
import {fetchBalance} from "../features/balance/balanceSlice";

export default function Balance() {
    const { transactions } = useSelector((state) => state.balance);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch])

    const calculateIncome = (transactions) => {
        let income = 0;
        transactions.forEach((transaction) => {
            const { type, amount } = transaction;
            if (type === "income") {
                income += amount;
            } else {
                income -= amount;
            }
        });

        return income;
    };

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>{" "}
                {transactions?.length > 0 ? (
                    <span>
                        {numberWithCommas(calculateIncome(transactions))}
                    </span>
                ) : (
                    0
                )}
            </h3>
        </div>
    );
}
