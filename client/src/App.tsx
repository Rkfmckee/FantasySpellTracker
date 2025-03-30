import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AuthContainer from "./layout/auth/AuthContainer";
import Layout from "./layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/status/NotFound";
import User from "./pages/User";
import Logout from "./pages/auth/Logout";
import { setNavigate } from "./services/NavigationService";

export default function App() {
    setNavigate(useNavigate());

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<AuthContainer />}>
                    <Route index element={<User />} />
                </Route>
                {/* <Route index element={<SpellList />} /> */}
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
