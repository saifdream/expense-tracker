import { BrowserRouter, Routes, Route } from "react-router-dom";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import AllTransactions from "./components/Transactions/AllTransactions";
import LatestTransactions from "./components/Transactions/LatestTransactions";
import Pagination from "./components/Pagination";
import SearchFilter from "./components/SearchFilter";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Layout>
                            <Balance />
                            <Form />
                            <LatestTransactions />
                        </Layout>
                    }
                />
                <Route 
                    path="transactions" 
                    element={
                        <Layout>
                            <div className="flex mb-4">
                                <div className="w-1/2 px-2">
                                    <Balance />
                                    <SearchFilter/>
                                </div>
                                <div className="w-1/2 px-2">
                                    <AllTransactions/>
                                    <Pagination/>
                                </div>
                            </div>
                        </Layout>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
