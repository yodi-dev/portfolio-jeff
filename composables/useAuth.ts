export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState('user', () => null)

  const fetchUser = async () => {
    if (!process.client || !$supabase) return // ⬅️ cegah error saat SSR
    const { data } = await $supabase.auth.getUser()
    user.value = data.user
  }

    const getUser = async () => {
    if (!user.value) {
      await fetchUser()
    }
    return user.value
  }

  const login = async (email: string, password: string) => {
    if (!$supabase) throw new Error('Supabase client not available')
    const { error } = await $supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    await fetchUser()
  }

  const logout = async () => {
    if (!$supabase) return
    await $supabase.auth.signOut()
    user.value = null
  }

  if (process.client) onMounted(fetchUser)

  return { user, login, logout, fetchUser, getUser }
}
