
export const useDevices = () => {
    const config = useRuntimeConfig()

    const getDevices = async (query: any, isDownload: boolean = false) => {
        let url = `${config.public.baseURL}/api/admin/report/device/`;

        if (isDownload) {
            url += 'download/?';
        } else {
            url += '?serial'; // &location_name&ip_address&count_page_total__on_start&count_page_color__on_start&count_page_total__on_end&count_page_color__on_end&count_page_black__on_period&count_page_color__on_period&count_page_total__on_period&black_cost__on_period&color_cost__on_period&full_cost__on_period&date_updated&interface&inventory_number&overall_printer_status&device_status&alert_codes&device_errors_counter';
        }

        const opts = {
            method: 'get',
            options: { responseType: 'blob' },
            credentials: 'include'
        }

        for (const key in query) {
            if (key && query[key]) {
                url += `&${key}=${query[key]}`;
            } else if (key) {
                url += `&${key}`
            }
        }

        if (isDownload) {
            return  await $fetch.raw(url, opts)
        } else {
            let response: any = await $fetch(url, opts);

            return { ...response };
        }
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
