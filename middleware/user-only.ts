import {useAuthUser} from "~/composable/useAuthUser";

export default defineNuxtRouteMiddleware(async () => {
  const user = useAuthUser();
  console.log("Current user", user);

  if (!user.value) return navigateTo({ name: "login" });
});
