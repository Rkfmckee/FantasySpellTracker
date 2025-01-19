import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import SpellList from "./pages/spellList/SpellList";
import NotFound from "./pages/status/NotFound";

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
