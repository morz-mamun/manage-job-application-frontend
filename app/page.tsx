'use client'

import { useRouter } from 'next/navigation'
import { useAuth, SignInButton, SignUpButton } from '@clerk/nextjs'
import { motion } from 'motion/react'
import {
  Sparkles, Target, FileText, BarChart3, ArrowRight, Zap,
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI Email Generator',
    desc: 'Paste a job post, get a perfectly tailored application email in seconds.',
  },
  {
    icon: Target,
    title: 'Application Tracker',
    desc: 'Track every application from saved to offer in a beautiful command center.',
  },
  {
    icon: FileText,
    title: 'CV Customizer',
    desc: 'AI tailors your CV summary to match each specific job description.',
  },
  {
    icon: BarChart3,
    title: 'Insights Dashboard',
    desc: 'See your stats, spot patterns, and optimize your job hunt strategy.',
  },
]

const stats = [
  { value: '10x', label: 'Faster applications' },
  { value: '3min', label: 'Per tailored email' },
  { value: '100%', label: 'Personalized' },
]

export default function LandingPage() {
  const router = useRouter()
  const { isSignedIn } = useAuth()

  return (
    <div className="min-h-screen bg-canvas relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-amber-glow opacity-30 pointer-events-none blur-3xl" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center shadow-amber-sm">
            <Zap className="w-4 h-4 text-canvas" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-text-primary">HuntAI</span>
        </div>

        <div className="flex items-center gap-3">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="btn-ghost text-sm">Sign in</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-primary text-sm">Get started free</button>
              </SignUpButton>
            </>
          ) : (
            <button className="btn-primary text-sm" onClick={() => router.push('/dashboard')}>
              Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber/20 bg-amber/5 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <span className="text-xs font-medium text-amber font-body tracking-wide">Powered by Claude AI</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            <span className="text-text-primary">Your job hunt,</span>
            <br />
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #F5A623 0%, #FFD080 50%, #F5A623 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
              }}
            >
              supercharged.
            </span>
          </h1>

          <p className="text-text-secondary font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop copy-pasting into ChatGPT. HuntAI generates tailored application emails,
            tracks every application, and customizes your CV — all in one command center.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {!isSignedIn ? (
              <>
                <SignUpButton mode="modal">
                  <button className="btn-primary text-base px-7 py-3.5 shadow-amber-glow">
                    Start hunting smarter <ArrowRight className="w-4 h-4" />
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="btn-secondary text-base px-7 py-3.5">
                    Sign in
                  </button>
                </SignInButton>
              </>
            ) : (
              <button
                className="btn-primary text-base px-7 py-3.5 shadow-amber-glow"
                onClick={() => router.push('/dashboard')}
              >
                Open Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-12 mt-20 flex-wrap"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-3xl text-amber">{s.value}</div>
              <div className="text-text-muted text-sm font-body mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-3">
            Everything you need to land the job
          </h2>
          <p className="text-text-secondary font-body">No more scattered tools. One focused workspace.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="card p-7 group"
            >
              <div className="w-11 h-11 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center mb-5 group-hover:bg-amber/15 transition-colors">
                <feature.icon className="w-5 h-5 text-amber" />
              </div>
              <h3 className="font-display font-semibold text-lg text-text-primary mb-2">{feature.title}</h3>
              <p className="text-text-secondary font-body text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-amber p-12 text-center rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-amber-glow opacity-30 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl text-text-primary mb-3">
              Ready to get hired?
            </h2>
            <p className="text-text-secondary font-body mb-8">
              Join developers who are landing jobs faster with HuntAI.
            </p>
            {!isSignedIn ? (
              <SignUpButton mode="modal">
                <button className="btn-primary px-8 py-3.5 text-base shadow-amber-glow">
                  Start for free — no credit card needed
                </button>
              </SignUpButton>
            ) : (
              <button
                className="btn-primary px-8 py-3.5 text-base shadow-amber-glow"
                onClick={() => router.push('/dashboard')}
              >
                Open Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber/20 flex items-center justify-center">
              <Zap className="w-3 h-3 text-amber" />
            </div>
            <span className="font-display font-bold text-sm text-text-secondary">HuntAI</span>
          </div>
          <p className="text-text-muted text-xs font-body">Built for developers, by a developer.</p>
        </div>
      </footer>
    </div>
  )
}