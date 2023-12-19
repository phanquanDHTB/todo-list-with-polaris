import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route
                path={"*"}
                element={<div style={{ textAlign: "center", marginTop: 300 }}>This page is not found!</div>}
            />
        </Routes>
    );
}

export default App;
