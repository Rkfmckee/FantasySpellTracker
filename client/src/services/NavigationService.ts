// Store an instance of useNavigation so it can be used outside Components

export let navigate: Function;

export const setNavigate = (fn: Function) => {
    navigate = fn;
};
