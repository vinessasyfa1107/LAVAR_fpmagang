import { useStore } from ".."


export const useSessionStore = () => {
    const [{sessionStore}, setState] = useStore();

    const changeSessionStore = (userData: object) => {
        setState("sessionStore", { sessionData: userData });
    }

    return [
        sessionStore,
        {
            changeSessionStore
        }
    ]
}