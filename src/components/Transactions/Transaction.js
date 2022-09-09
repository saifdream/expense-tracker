import {useMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
    editActive,
    fetchTransactions,
    removeTransaction,
} from "../../features/transaction/transactionSlice";
import { fetchBalance } from "../../features/balance/balanceSlice";
import numberWithCommas from "../../utils/numberWithCommas";

export default function Transaction({ transaction }) {
    const { name, amount, type, id } = transaction || {};
    const dispatch = useDispatch();
    const {limit} = useSelector(
        (state) => state.transaction
    );
    const match = useMatch('/');

    console.log(match)

    const handleEdit = () => {
        dispatch(editActive(transaction));
    };

    const handleDelete = () => {
        dispatch(removeTransaction(+id))
            .then(()=> {
                let queryStr = `?_sort=id&_order=desc&_page=1`;
                if(match)
                    queryStr = `${queryStr}&_limit=${5}`;
                else
                    queryStr = `${queryStr}&_limit=${limit}`;

                dispatch(fetchTransactions(queryStr));
            })
            .finally(() => {
                dispatch(fetchBalance());
            });
    };

    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(amount)}</p>
                <button className="link" onClick={handleEdit}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link" onClick={handleDelete}>
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
