'use client'

import { useState } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { JobCard } from '@/components/jobs/JobCard'
import { AddJobModal } from '@/components/jobs/AddJobModal'
import { useJobs } from '@/hooks/useJobs'
import { Plus, Search, SlidersHorizontal, Loader2 } from 'lucide-react'
import { Job } from '@/types'

const statusFilters: Array<{ value: string; label: string }> = [
  { value: '', label: 'All' },
  { value: 'saved', label: 'Saved' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
]

export default function JobsPage() {
  const [addOpen, setAddOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useJobs({
    page,
    limit: 12,
    search: search || undefined,
    status: status || undefined,
    sort: 'createdAt',
    order: 'desc',
  })

  return (
    <div className="min-h-screen">
      <TopBar
        title="Job Board"
        subtitle={data?.meta ? `${data.meta.total} jobs tracked` : undefined}
        action={
          <button onClick={() => setAddOpen(true)} className="btn-primary text-xs px-4 py-2">
            <Plus className="w-3.5 h-3.5" /> Add Job
          </button>
        }
      />

      <div className="px-8 py-6 max-w-6xl">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              className="input pl-9 py-2.5 text-sm"
              placeholder="Search jobs, companies..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => { setStatus(f.value); setPage(1) }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-all"
                style={
                  status === f.value
                    ? { background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)' }
                    : { background: 'rgba(255,255,255,0.04)', color: '#8892A4', border: '1px solid #1E2230' }
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-amber" />
          </div>
        ) : !data?.data?.length ? (
          <div className="card p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-border flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-text-muted" />
            </div>
            <p className="font-display font-semibold text-text-primary mb-2">No jobs found</p>
            <p className="text-text-muted text-sm font-body mb-6">
              {search || status ? 'Try different filters' : 'Start by saving your first job posting'}
            </p>
            {!search && !status && (
              <button onClick={() => setAddOpen(true)} className="btn-primary mx-auto">
                <Plus className="w-4 h-4" /> Add your first job
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.data.map((job: Job, i: number) => (
                <JobCard key={job._id} job={job} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {data.meta && data.meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={!data.meta.hasPrevPage}
                  className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-text-muted font-body px-3">
                  {page} / {data.meta.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!data.meta.hasNextPage}
                  className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AddJobModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}
