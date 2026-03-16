'use client'

import { useUser } from '@clerk/nextjs'
import { Bell, Search } from 'lucide-react'

interface TopBarProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function TopBar({ title, subtitle, action }: TopBarProps) {
  const { user } = useUser()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <header
      className="h-16 flex items-center justify-between px-8 border-b border-border sticky top-0 z-10"
      style={{ background: 'rgba(10,11,15,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <div>
        <h1 className="font-display font-semibold text-lg text-text-primary leading-none">{title}</h1>
        {subtitle && (
          <p className="text-xs text-text-muted font-body mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {action}
        <div className="h-5 w-px bg-border" />
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-text-primary font-body">
            {greeting}{user?.firstName ? `, ${user.firstName}` : ''}
          </p>
          <p className="text-[10px] text-text-muted font-body">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
    </header>
  )
}
