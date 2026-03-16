'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { RecentJobs } from '@/components/dashboard/RecentJobs'
import { useJobStats, useJobs } from '@/hooks/useJobs'
import { Sparkles, Plus, ArrowRight, FileText, Zap } from 'lucide-react'

function SkeletonCard() {
  return <div className="skeleton h-24 w-full" />
}

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useJobStats()
  const { data: jobsData, isLoading: jobsLoading } = useJobs({ limit: 6, sort: 'createdAt', order: 'desc' })

  return (
    <div className="min-h-screen">
      <TopBar
        title="Dashboard"
        subtitle="Your job hunt command center"
        action={
          <Link href="/jobs">
            <button className="btn-primary text-xs px-4 py-2">
              <Plus className="w-3.5 h-3.5" />
              Add Job
            </button>
          </Link>
        }
      />

      <div className="px-8 py-8 space-y-8 max-w-6xl">
        {/* Stats */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-semibold text-base text-text-primary">Overview</h2>
            <div className="amber-line" />
          </div>

          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : stats ? (
            <StatsCards stats={stats} />
          ) : null}
        </section>

        {/* Quick Actions */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-semibold text-base text-text-primary">Quick Actions</h2>
            <div className="amber-line" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                href: '/ai-tools',
                icon: Sparkles,
                title: 'Generate Email',
                desc: 'Paste a job post → get a tailored application email',
                color: '#F5A623',
                bg: 'rgba(245,166,35,0.08)',
                border: 'rgba(245,166,35,0.2)',
              },
              {
                href: '/jobs',
                icon: Plus,
                title: 'Save a Job',
                desc: 'Add a new job posting to track',
                color: '#93C5FD',
                bg: 'rgba(59,130,246,0.08)',
                border: 'rgba(59,130,246,0.2)',
              },
              {
                href: '/cv',
                icon: FileText,
                title: 'Update CV',
                desc: 'Keep your profile sharp and ready',
                color: '#6EE7B7',
                bg: 'rgba(16,185,129,0.08)',
                border: 'rgba(16,185,129,0.2)',
              },
            ].map((action, i) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <Link href={action.href}>
                  <div
                    className="card p-5 cursor-pointer group"
                    style={{ borderColor: action.border }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: action.bg, border: `1px solid ${action.border}` }}
                    >
                      <action.icon className="w-4.5 h-4.5" style={{ color: action.color }} />
                    </div>
                    <h3 className="font-body font-semibold text-sm text-text-primary mb-1">{action.title}</h3>
                    <p className="text-xs text-text-muted font-body leading-relaxed">{action.desc}</p>
                    <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-medium" style={{ color: action.color }}>Open</span>
                      <ArrowRight className="w-3 h-3" style={{ color: action.color }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent jobs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display font-semibold text-base text-text-primary">Recent Jobs</h2>
              <div className="amber-line" />
            </div>
            <Link href="/jobs">
              <button className="btn-ghost text-xs flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {jobsLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-16 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <RecentJobs jobs={jobsData?.data ?? []} />
          )}
        </section>
      </div>
    </div>
  )
}
