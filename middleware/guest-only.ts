import {useAuthUser} from "~/composable/useAuthUser";

export default defineNuxtRouteMiddleware(async () => {
  console.log('guest here');
  const user = useAuthUser();

  if (user.value) {
    if (process.server) return navigateTo({ name: "index" });

    return abortNavigation();
  }
});
