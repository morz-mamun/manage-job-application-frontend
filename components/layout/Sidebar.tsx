'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Briefcase, FileText,
  Sparkles, Zap, ChevronRight
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/jobs', icon: Briefcase, label: 'Job Board' },
  { href: '/cv', icon: FileText, label: 'My CV' },
  { href: '/ai-tools', icon: Sparkles, label: 'AI Tools' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] flex flex-col z-20"
      style={{
        background: 'linear-gradient(180deg, #111318 0%, #0D0F14 100%)',
        borderRight: '1px solid #1E2230',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-6 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center shadow-amber-sm flex-shrink-0">
          <Zap className="w-4 h-4 text-canvas" strokeWidth={2.5} />
        </div>
        <div>
          <span className="font-display font-bold text-base text-text-primary leading-none">HuntAI</span>
          <p className="text-[10px] text-text-muted font-body mt-0.5">Job Search OS</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 text-[10px] font-medium text-text-muted uppercase tracking-widest mb-3 font-body">
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-150 group relative',
                  isActive
                    ? 'bg-amber/10 text-amber border border-amber/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-amber/10 rounded-xl border border-amber/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <item.icon
                  className={cn('w-4 h-4 relative z-10 flex-shrink-0', isActive ? 'text-amber' : '')}
                  strokeWidth={isActive ? 2 : 1.75}
                />
                <span className="relative z-10 flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-3 h-3 text-amber/60 relative z-10" />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8 rounded-xl',
              },
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text-primary font-body truncate">My Account</p>
            <p className="text-[10px] text-text-muted font-body">Manage profile</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
