import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// Inject Clerk token into every request
api.interceptors.request.use(async (config) => {
  try {
    // @ts-ignore — window.__clerk is set by ClerkProvider
    const token = await window?.Clerk?.session?.getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (_) {}
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  },
)

export default api
