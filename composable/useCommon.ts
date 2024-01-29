
export const useCommon = () => {
    const config = useRuntimeConfig()

    const getSettings = async (section_name: string) => {
        let url = `${config.public.baseURL}/app/settingsget/?lk_section_name=${section_name}`;

        const opts = {
            method: 'get',
            credentials: 'include'
        };

        return await $fetch(url, opts);
    };

    const fetchParams = async  () => {
        let url = `${config.public.baseURL}/api/admin/report/device/attrs/`;

        const opts = {
            method: 'get',
            credentials: 'include'
        };

        return await $fetch(url, opts);
    };

    const setParams = async data => {
        try {
            const url = `${config.public.baseURL}/app/settingssave/`;

            const opts = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };

            const response = await $fetch(url, opts);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Обработка успешного ответа, если необходимо
            const responseData = await response.json();
            console.log(responseData);

            return responseData;
        } catch (error) {
            console.error('Error during POST request:', error);
            // Обработка ошибок
            throw error;
        }
    };


    return {
        getSettings,
        fetchParams,
        setParams
    };
};
