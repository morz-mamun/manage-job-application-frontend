import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { Job, JobStats, PaginationMeta } from '@/types'
import toast from 'react-hot-toast'

interface JobsResponse {
  data: Job[]
  meta: PaginationMeta
}

interface JobFilters {
  page?: number
  limit?: number
  status?: string
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: JobFilters) => [...jobKeys.lists(), filters] as const,
  detail: (id: string) => [...jobKeys.all, 'detail', id] as const,
  stats: () => [...jobKeys.all, 'stats'] as const,
}

export function useJobs(filters: JobFilters = {}) {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: async () => {
      const { data } = await api.get('/jobs', { params: filters })
      return data as { data: Job[]; meta: PaginationMeta }
    },
  })
}

export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get(`/jobs/${id}`)
      return data.data as Job
    },
    enabled: !!id,
  })
}

export function useJobStats() {
  return useQuery({
    queryKey: jobKeys.stats(),
    queryFn: async () => {
      const { data } = await api.get('/jobs/stats')
      return data.data as JobStats
    },
  })
}

export function useCreateJob() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<Job>) => {
      const { data } = await api.post('/jobs', payload)
      return data.data as Job
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all })
      toast.success('Job saved successfully!')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useUpdateJob() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...payload }: Partial<Job> & { id: string }) => {
      const { data } = await api.patch(`/jobs/${id}`, payload)
      return data.data as Job
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all })
      toast.success('Job updated!')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}

export function useDeleteJob() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/jobs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all })
      toast.success('Job removed')
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
