import { useAuthUser } from "./useAuthUser";


export const useAuth = () => {
    const config = useRuntimeConfig()

    const authUser = useAuthUser();

    const setUser = (user: any) => {
        authUser.value = user;
    };

    const setCookie = (cookie: any) => {
        cookie.value = cookie;
    };

    const login = async (email: string, password: string) => {
        const data: any = await $fetch(`${config.public.baseURL}/app/login/`, {
            method: 'POST',
            body: {
                uname: email,
                upass: password
            },

            mode: 'cors',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });



        console.log('DATA USER', data);
        setUser(data.d.user);

        const cookie = useCookie('cookie');
        cookie.value = data?.d?.user?.key;

        const id = useCookie('monitoring_session_id');
        id.value = data?.d?.user?.key;

        return authUser;
    };

    const logout = async () => {
        const data = await $fetch("/auth/logout", {
            method: "POST",
        });

        setUser(data.user);
    };

    const me = async () => {
        if (!authUser.value) {
            try {
                const data = await $fetch("/auth/me", {
                    headers: useRequestHeaders(["cookie"]) as HeadersInit,
                });

                setUser(data.user);
            } catch (error) {
                setCookie(null);
            }
        }

        return authUser;
    };

    return {
        login,
        logout
    };
};
