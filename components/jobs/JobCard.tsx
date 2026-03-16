'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Job } from '@/types'
import { statusConfig, timeAgo } from '@/lib/utils'
import { MapPin, Building2, ExternalLink, Trash2, Globe, Calendar } from 'lucide-react'
import { useDeleteJob, useUpdateJob } from '@/hooks/useJobs'

const statusOptions: Array<{ value: Job['status']; label: string }> = [
  { value: 'saved', label: 'Saved' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' },
]

export function JobCard({ job, index = 0 }: { job: Job; index?: number }) {
  const deleteJob = useDeleteJob()
  const updateJob = useUpdateJob()
  const sc = statusConfig[job.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="card p-5 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <Link href={`/jobs/${job._id}`}>
            <h3 className="font-body font-semibold text-sm text-text-primary hover:text-amber transition-colors cursor-pointer truncate">
              {job.title}
            </h3>
          </Link>
          <div className="flex items-center gap-3 mt-1 text-xs text-text-muted font-body flex-wrap">
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3" strokeWidth={1.5} />
              {job.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" strokeWidth={1.5} />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" strokeWidth={1.5} />
              {timeAgo(job.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {job.url && (
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost p-1.5 rounded-lg opacity-0 group-hover:opacity-100">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </a>
          )}
          <button
            onClick={() => deleteJob.mutate(job._id)}
            className="btn-ghost p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:text-red-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tags */}
      {job.tags?.length > 0 && (
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {job.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium font-body"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#8892A4', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className={`badge ${sc.class} text-xs`}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />
          {sc.label}
        </span>

        {/* Status changer */}
        <select
          value={job.status}
          onChange={(e) => updateJob.mutate({ id: job._id, status: e.target.value as Job['status'] })}
          className="text-[11px] font-body font-medium bg-transparent border border-border rounded-lg px-2 py-1 text-text-secondary cursor-pointer outline-none hover:border-border-bright transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  )
}
