import { useMutation } from '@tanstack/react-query'
import api from '@/lib/api'
import toast from 'react-hot-toast'

export function useGenerateEmail() {
  return useMutation({
    mutationFn: async (payload: {
      jobDescription: string
      tone?: 'professional' | 'enthusiastic' | 'concise'
      jobId?: string
      additionalContext?: string
    }) => {
      const { data } = await api.post('/ai/generate-email', payload)
      return data.data.email as string
    },
    onSuccess: () => toast.success('Email generated!'),
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useGenerateCVSummary() {
  return useMutation({
    mutationFn: async (payload: { jobDescription: string; jobId?: string }) => {
      const { data } = await api.post('/ai/generate-cv-summary', payload)
      return data.data.summary as string
    },
    onSuccess: () => toast.success('CV summary generated!'),
    onError: (err: Error) => toast.error(err.message),
  })
}
