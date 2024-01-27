export const useLocations = () => {
    const config = useRuntimeConfig()

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

    return {
        getLocations
    };
};

