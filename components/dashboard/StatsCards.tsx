'use client'

import { motion } from 'framer-motion'
import { Briefcase, Send, MessageSquare, Trophy, XCircle, TrendingUp } from 'lucide-react'
import { JobStats } from '@/types'

interface StatCardProps {
  label: string
  value: number
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  delay?: number
}

function StatCard({ label, value, icon: Icon, color, bgColor, borderColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="card p-5 relative overflow-hidden group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-muted font-body uppercase tracking-wide mb-3">{label}</p>
          <p
            className="font-display font-bold text-3xl leading-none"
            style={{ color }}
          >
            {value}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: bgColor, border: `1px solid ${borderColor}` }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color }} strokeWidth={1.75} />
        </div>
      </div>

      {/* Subtle bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  )
}

const statConfig = [
  { key: 'total', label: 'Total Jobs', icon: Briefcase, color: '#F0F2F8', bgColor: 'rgba(240,242,248,0.08)', borderColor: 'rgba(240,242,248,0.12)' },
  { key: 'applied', label: 'Applied', icon: Send, color: '#C4B5FD', bgColor: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.2)' },
  { key: 'interview', label: 'Interviews', icon: MessageSquare, color: '#F5A623', bgColor: 'rgba(245,166,35,0.1)', borderColor: 'rgba(245,166,35,0.2)' },
  { key: 'offer', label: 'Offers', icon: Trophy, color: '#6EE7B7', bgColor: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)' },
  { key: 'saved', label: 'Saved', icon: TrendingUp, color: '#93C5FD', bgColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.2)' },
  { key: 'rejected', label: 'Rejected', icon: XCircle, color: '#FCA5A5', bgColor: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)' },
]

export function StatsCards({ stats }: { stats: JobStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {statConfig.map((config, i) => (
        <StatCard
          key={config.key}
          label={config.label}
          value={stats[config.key as keyof JobStats]}
          icon={config.icon}
          color={config.color}
          bgColor={config.bgColor}
          borderColor={config.borderColor}
          delay={i * 0.05}
        />
      ))}
    </div>
  )
}
