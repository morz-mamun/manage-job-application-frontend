'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Job } from '@/types'
import { statusConfig, timeAgo } from '@/lib/utils'
import { ArrowRight, MapPin, Building2 } from 'lucide-react'

export function RecentJobs({ jobs }: { jobs: Job[] }) {
  if (!jobs?.length) {
    return (
      <div className="card p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-border flex items-center justify-center mx-auto mb-3">
          <Building2 className="w-5 h-5 text-text-muted" />
        </div>
        <p className="text-text-secondary font-body text-sm">No jobs yet. Start by saving a job post!</p>
        <Link href="/jobs">
          <button className="btn-primary mt-4 text-xs px-4 py-2">Add your first job</button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {jobs.map((job, i) => {
        const sc = statusConfig[job.status]
        return (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <Link href={`/jobs/${job._id}`}>
              <div className="card px-5 py-4 flex items-center gap-4 group cursor-pointer">
                {/* Status dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: sc.dot, boxShadow: `0 0 6px ${sc.dot}60` }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-body font-medium text-sm text-text-primary truncate">
                      {job.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted font-body">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`badge ${sc.class} text-xs`}>{sc.label}</span>
                  <span className="text-xs text-text-muted font-body hidden sm:block">{timeAgo(job.createdAt)}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
