
export const useDevices = () => {
    const config = useRuntimeConfig()

    const getDevices = async (query: any, isDownload: boolean = false) => {
        console.log("QUERY", query)
        let url = `${config.public.baseURL}/api/admin/report/device/`;

        url += isDownload ? 'download/?name' : '?name&serial&location_name&ip_address'

        const opts = {
            method: 'get',
            options: { responseType: 'blob' },
            credentials: 'include'
        }

        for (const key in query) {
            console.log('KEY', key)
            if (key && query[key]) url += `&${key}=${query[key]}`;
        }

        return isDownload ? await $fetch.raw(url, opts) : await $fetch(url, opts)
        //http://localhost:8000/api/admin/report/device/?date_start=2024-01-01&date_end=2024-01-31
    };

    const getLocations = async () => {
        return await $fetch(`${config.public.baseURL}/app/locations/`, {
            method: "GET"
        });
    };

    const getStatuses = async () => {
        return  await $fetch(`${config.public.baseURL}/app/devices/2/statuses/`,
            {credentials: 'include',}
                )
    };

    return {
        getDevices,
        getLocations,
        getStatuses
    };
};
