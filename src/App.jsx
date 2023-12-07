import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/home";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<TodoPage />} />
            <Route
                path={"*"}
                element={<div style={{ textAlign: "center", marginTop: 300 }}>This page is not found!</div>}
            />
        </Routes>
    );
}

export default App;
