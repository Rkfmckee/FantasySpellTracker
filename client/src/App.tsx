import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import NotFound from "./pages/status/NotFound";
import SpellList from "./pages/SpellList";
import "./App.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="" element={<SpellList />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
