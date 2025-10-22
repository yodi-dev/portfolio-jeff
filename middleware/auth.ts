export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getUser } = useAuth()
  const user = await getUser()

  if (!user) {
    return navigateTo('/login')
  }
})
