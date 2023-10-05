import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Journal from "./Journal";
import Plan from "./Plan";
import TodoList from "./TodoList";
import Budget from "./Budget";
import Income from "./Income";
import Expenses from "./Expenses";
import ShowBill from "./ShowBill";
import History from "./History";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/todolist" element={<TodoList />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/showbill" element={<ShowBill />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </Router>
    );
}

export default App;
