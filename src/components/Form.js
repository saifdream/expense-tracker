import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeTransaction,
    createTransaction, editInActive,
} from "../features/transaction/transactionSlice";
import {fetchBalance} from "../features/balance/balanceSlice";

export default function Form() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector((state) => state.transaction);
    const { editing } = useSelector((state) => state.transaction) || {};

    // listen for edit mode active
    useEffect(() => {
        const { id, name, amount, type } = editing || {};
        if (id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            setEditMode(false);
            reset();
        }
    }, [editing]);

    const reset = () => {
        setName("");
        setType("");
        setAmount("");
    };

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(
            createTransaction({
                name,
                type,
                amount: Number(amount),
            })
        ).then(() => {
            dispatch(fetchBalance());
        });
        reset();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            changeTransaction({
                id: editing?.id,
                data: {
                    name: name,
                    amount: +amount,
                    type: type,
                },
            })
        ).then(() => {
            dispatch(fetchBalance());
        });
        setEditMode(false);
        reset();
    };

    const cancelEditMode = () => {
        reset();
        setEditMode(false);
        dispatch(editInActive())
    };

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    {/*<input
                        type="text"
                        name="name"
                        required
                        placeholder="enter title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />*/}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        required
                        placeholder="enter title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === "income"}
                            onChange={(e) => setType("income")}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === "expense"}
                            onChange={(e) => setType("expense")}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    {/*<input
                        type="number"
                        required
                        placeholder="enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />*/}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        required
                        placeholder="enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600" type="submit">
                    {editMode ? "Update Transaction" : "Add Transaction"}
                </button>

                {!isLoading && isError && (
                    <p className="error">There was an error occured</p>
                )}
            </form>

            {editMode && (
                <button className="btn cancel_edit" onClick={cancelEditMode}>
                    Cancel Edit
                </button>
            )}
        </div>
    );
}
