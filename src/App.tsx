import "./App.css";
import BarChart from "./components/BarChart";
import { User } from "./components/Table";
import TablePage from "./pages/TablePage";
import { useState } from "react";

function App() {
    const [data, setData] = useState<User[]>([]);
    return (
        <>
            <TablePage data={data} setData={setData} />
            <br />
            <BarChart data={data} />
        </>
    );
}

export default App;
