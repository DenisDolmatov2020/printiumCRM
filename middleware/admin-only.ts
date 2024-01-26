import {useAdmin} from "~/composable/useAdmin";

export default defineNuxtRouteMiddleware(async () => {
  const isAdmin = useAdmin();

  if (!isAdmin?.value) return navigateTo({ name: "login" });
});
