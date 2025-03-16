import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContainer from "./components/auth/AuthContainer";
import Layout from "./components/layout/Layout";
import Login from "./components/pages/auth/Login";
import SpellList from "./components/pages/spellList/SpellList";
import NotFound from "./components/pages/status/NotFound";
import User from "./components/pages/User";

export default function App() {
    return (
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
    );
}
