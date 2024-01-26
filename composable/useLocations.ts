import {useAuthUser} from "~/composable/useAuthUser";
import { getCookie } from 'cookie-universal-nuxt';

export const useLocations = () => {
    const config = useRuntimeConfig()

    const authUser = useAuthUser();

    const getLocations = async () => {
        try {
            const cookie = useCookie('cookie');

            const response = await fetch(`${config.public.baseURL}/app/locations/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для JSON-данных
                    'Cookie': `monitoring_session_id=${cookie.value}`
                },
                body: JSON.stringify({
                    key: cookie.value
                }),
            });

            const { d } = await response.json();
            return d;
        } catch (error) {
            console.error('Error fetching locations:', error);
            throw error;
        }
    };

    const logout = async () => {
        const data = await $fetch("/auth/logout", {
            method: "POST",
        });

        // setUser(data.user);
    };

    const me = async () => {
        if (!authUser.value) {
            try {
                const data = await $fetch("/auth/me", {
                    headers: useRequestHeaders(["cookie"]) as HeadersInit,
                });

                // setUser(data.user);
            } catch (error) {
                // setCookie(null);
            }
        }

        return authUser;
    };

    // Функция для получения CSRF токена из куки
    const getCSRFToken = () => {
        // @ts-ignore
        const csrftoken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];
        return csrftoken;
    };

    return {
        getLocations
    };
};

