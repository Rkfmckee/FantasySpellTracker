import { useQuery } from "@tanstack/react-query";
import { getUserName } from "../services/AuthService";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
    // Store the user info in a cache which never goes stale
    // We only need to query the API once, then keep that info stored here
    const { data: user, ...rest } = useQuery({
        queryKey: [AUTH],
        queryFn: getUserName,
        staleTime: Infinity,
        ...opts,
    });

    return {
        user,
        ...rest,
    };
};

export default useAuth;
