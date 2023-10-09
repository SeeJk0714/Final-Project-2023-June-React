import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Journal from "./Journal";
import AddJournal from "./AddJournal";
import EditJournal from "./EditJournal";
import ShowJournal from "./ShowJournal";
import Plan from "./Plan";
import AddPlan from "./AddPlan";
import EditPlan from "./EditPlan";
import ShowPlan from "./ShowPlan";
import TodoList from "./TodoList";
// import AddTodoList from "./AddTodoList";
import Budget from "./Budget";
import Income from "./Income";
import Expenses from "./Expenses";
import ShowBill from "./ShowBill";
import History from "./History";
import ShowList from "./ShowList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/add_journal" element={<AddJournal />} />
                <Route path="/edit_journal/:id" element={<EditJournal />} />
                <Route path="/showjournal/:id" element={<ShowJournal />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/add_plan" element={<AddPlan />} />
                <Route path="/edit_plan/:id" element={<EditPlan />} />
                <Route path="/showplan/:id" element={<ShowPlan />} />
                <Route path="/todolist" element={<TodoList />} />
                {/* <Route path="/add_todolist" element={<AddTodoList />} /> */}
                <Route path="/showlist/:id" element={<ShowList />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/income/:id" element={<Income />} />
                <Route path="/expenses/:id" element={<Expenses />} />
                <Route path="/showbill/:id" element={<ShowBill />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </Router>
    );
}

export default App;
