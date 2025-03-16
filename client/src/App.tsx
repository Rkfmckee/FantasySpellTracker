import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import AuthContainer from "./components/auth/AuthContainer";
import SpellList from "./components/pages/spellList/SpellList";
import Login from "./components/pages/auth/Login";
import NotFound from "./components/pages/status/NotFound";
import User from "./components/pages/User";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<AuthContainer />}>
                        <Route path="User" element={<User />} />
                    </Route>
                    <Route path="" element={<SpellList />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
