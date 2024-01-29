
export const useCommon = () => {
    const config = useRuntimeConfig();

    const getParts = async (serial: string) => {
        let url = `${config.public.baseURL}/app/parts_printer/${serial}/`;

        const opts = {
            method: 'get',
            credentials: 'include'
        };

        return await $fetch(url, opts);
    };

    const getParams = async (serial: string) => {
        let url = `${config.public.baseURL}/app/get_printer_snmp_params/${serial}/`;

        const opts = {
            method: 'get',
            credentials: 'include'
        };

        return await $fetch(url, opts);
    };

    const getSettings: any = async (section_name: string) => {
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

    const setParams: any = async data => {
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
        getParts,
        getParams,
        getSettings,
        fetchParams,
        setParams
    };
};
