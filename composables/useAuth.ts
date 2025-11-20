export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState('user', () => null)
  const loading = useState('auth_loading', () => false)
  const router = useRouter()

  const fetchUser = async () => {
    if (!$supabase) return
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

  const handleLogin = async (email: string, password: string) => {
    try {
      loading.value = true
      await login(email, password)
      router.push('/admin')
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      await $supabase.auth.signOut()
      user.value = null
      router.push('/login')
    } finally {
      loading.value = false
    }
  }

  // onMounted(() => {
  //   fetchUser()
  // })

  return { user, loading, login, handleLogin, logout, fetchUser, getUser }
}
