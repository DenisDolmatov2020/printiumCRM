import {useAuthUser} from "~/composable/useAuthUser";
import {includes} from "lodash-es";

export const useDevices = () => {
    const config = useRuntimeConfig()

    const getDevices = async (query: any) => {
        let url = `${config.public.baseURL}/api/admin/report/device/`;

        for (const key in query) {
            console.log('K', key);
            // url += `?${key}=${query[key]}`
        }

        const data = await $fetch(url, {
            credentials: 'include'
        });

        console.log("DATA DEVICES", data);

        // setUser(data.d.user);
        return data;
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
