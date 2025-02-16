import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/UseAuth";
import Layout from "./layout/Layout";
import SpellList from "./pages/spellList/SpellList";
import NotFound from "./pages/status/NotFound";

export default function App() {
    const loggedIn = useAuth();

    return loggedIn ? (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="" element={<SpellList />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    ) : (
        <h1>Must log in</h1>
    );
}
