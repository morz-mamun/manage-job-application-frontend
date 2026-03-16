import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { CVData } from '@/types'
import toast from 'react-hot-toast'

export const cvKeys = {
  all: ['cv'] as const,
  detail: () => [...cvKeys.all, 'detail'] as const,
}

export function useCV() {
  return useQuery({
    queryKey: cvKeys.detail(),
    queryFn: async () => {
      const { data } = await api.get('/cv')
      return data.data as CVData
    },
  })
}

export function useUpdateCV() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<CVData>) => {
      const { data } = await api.patch('/cv', payload)
      return data.data as CVData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cvKeys.all })
      toast.success('CV updated successfully!')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
