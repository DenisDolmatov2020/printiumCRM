import {useAuthUser} from "~/composable/useAuthUser";

export const useDevices = () => {
    const config = useRuntimeConfig()

    const authUser = useAuthUser();

    const setUser = (user: any) => {
        authUser.value = user;
    };

    const setCookie = (cookie: any) => {
        cookie.value = cookie;
    };

    const getDevices = async (query: any) => {
        let url = `${config.public.baseURL}/api/v1/devices/`;

        for (const key in query) {
            console.log('K', key);
            url += `?${key}=${query[key]}`
        }

        const data = await $fetch(url, {
            method: "GET"
        });

        console.log("DATA DEVICES", data);

        // setUser(data.d.user);
        return data;
    };

    const getLocations = async () => {
        const data = await $fetch(`${config.public.baseURL}/app/locations/`, {
            method: "GET"
        });

        console.log('DATA LLL', data);

        // setUser(data.d.user);
        return data;
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
        getDevices,
        getLocations
    };
};
