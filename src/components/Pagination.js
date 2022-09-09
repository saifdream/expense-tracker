import { useDispatch, useSelector } from "react-redux";
import {setCurrentPage} from "../features/transaction/transactionSlice";

export default function Pagination() {
    const { currentPage, totalPage } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    const onPageClickHandler = (page) => dispatch(setCurrentPage(page));

    if(totalPage === 0 && totalPage === 1) return null;

    return (
        <section className="pt-12">
            <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
                {
                    Array(totalPage).fill(1).map((item, index) => (
                        <div
                            key={index}
                            className={`${currentPage === index +1 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"} px-4 py-2 rounded-full cursor-pointer`}
                            onClick={()=> onPageClickHandler(index + 1)}
                        >
                            { index + 1 }
                        </div>
                    ))
                }
            </div>
        </section>
    );
}
