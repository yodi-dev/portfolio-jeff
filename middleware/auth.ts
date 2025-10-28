export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()

  // Jika halaman butuh login tapi user belum ada
  if (to.path.startsWith('/admin') && !user.value) {
    return navigateTo('/login')
  }
})
