import useAuth from "../hooks/useAuth";

const User = () => {
    const { user } = useAuth();

    return <h1>{user?.data.userName}</h1>;
};

export default User;
