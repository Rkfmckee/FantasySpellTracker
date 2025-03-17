import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContainer from "./layout/auth/AuthContainer";
import Layout from "./layout/Layout";
import Login from "./pages/auth/Login";
import SpellList from "./pages/spellList/SpellList";
import NotFound from "./pages/status/NotFound";
import User from "./pages/User";

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
