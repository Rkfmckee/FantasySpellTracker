import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContainer from "./layout/auth/AuthContainer";
import Layout from "./layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/status/NotFound";
import User from "./pages/User";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<AuthContainer />}>
                    {/* <Route index element={<User />} /> */}
                </Route>
                {/* <Route index element={<SpellList />} /> */}
                <Route index element={<User />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
