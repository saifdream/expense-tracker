import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransactions} from "../features/transaction/transactionSlice";
import Form from "./Form";
import {
    resetTransactionFilter,
    setTransactionSearch,
    setTransactionType
} from "../features/filter/transactionFilterSlice";

export default function SearchFilter() {
    const { search: _search, type: _type } = useSelector((state) => state.filter);
    const [type, setType] = useState(_search);
    const [search, setSearch] = useState(_type);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {editing} = useSelector((state) => state.transaction);

    console.log(_search, _type)

    const handleTypeChange = (type) => {
        setType(type);

        // let queryStr = `?_sort=id&_order=desc&_page=${currentPage}&_limit=${limit}`;
        // if(search) queryStr = `${queryStr}&name_like=${search}`;
        // if(type) queryStr = `${queryStr}&type=${type}`;
        dispatch(setTransactionType(type))
        // dispatch(fetchTransactions(queryStr));
    };

    useEffect(() => {
        setSearch(_search);
        setType(_type);
    }, [_search, _type]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            doSearch();
        }
    }

    const doSearch = () => {
        // let queryStr = `?_sort=id&_order=desc&_page=${currentPage}&_limit=${limit}`;
        //
        // if(search) queryStr = `${queryStr}&name_like=${search}`;
        // if(type) queryStr = `${queryStr}&type=${type}`;
        dispatch(setTransactionSearch(search))
        // dispatch(fetchTransactions(queryStr));
    }

    const onReset = () => {
        setSearch("");
        setType("");
        dispatch(resetTransactionFilter());
    };

    return (
        <>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Search"
                        onKeyDown={handleKeyDown}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button className="btn btn-blue my-2" onClick={doSearch}>
                        Search
                    </button>
                </div>
                <div className="flex py-4">
                    <div className="flex items-center mr-4">
                        <input
                            type="radio"
                            value="income"
                            checked={type === 'income'}
                            name="inline-radio-group"
                            onChange={() => handleTypeChange('income')}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="inline-radio"
                               className="ml-2 text-sm font-medium text-black-900 dark:text-gray-900">Income</label>
                    </div>
                    <div className="flex items-center mr-4">
                        <input
                            type="radio"
                            value="expense"
                            checked={type === 'expense'}
                            name="inline-radio-group"
                            onChange={() => handleTypeChange('expense')}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="inline-2-radio"
                               className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-900">Expense</label>
                    </div>
                </div>
                <div className="flex items-center justify-between py-4">
                    <button className="btn btn-blue" onClick={onReset}>
                        Reset
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <button className="btn btn-blue" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </div>
            {
                editing?.id && <div className="bg-white shadow-md rounded">
                    <Form/>
                </div>
            }
        </>
    )
}