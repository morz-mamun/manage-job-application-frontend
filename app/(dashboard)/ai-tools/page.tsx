'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { useGenerateEmail, useGenerateCVSummary } from '@/hooks/useAI'
import { useJobs } from '@/hooks/useJobs'
import {
  Sparkles, FileText, Copy, CheckCheck,
  Loader2, ChevronDown, Zap, Wand2
} from 'lucide-react'
import toast from 'react-hot-toast'

type ActiveTool = 'email' | 'cv'

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('email')
  const [jobDescription, setJobDescription] = useState('')
  const [tone, setTone] = useState<'professional' | 'enthusiastic' | 'concise'>('professional')
  const [additionalContext, setAdditionalContext] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const generateEmail = useGenerateEmail()
  const generateCVSummary = useGenerateCVSummary()
  const { data: jobsData } = useJobs({ limit: 50 })

  const isPending = generateEmail.isPending || generateCVSummary.isPending

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description first')
      return
    }

    setResult('')
    try {
      if (activeTool === 'email') {
        const res = await generateEmail.mutateAsync({ jobDescription, tone, additionalContext })
        setResult(res)
      } else {
        const res = await generateCVSummary.mutateAsync({ jobDescription })
        setResult(res)
      }
    } catch {}
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <TopBar
        title="AI Tools"
        subtitle="Powered by Claude AI"
      />

      <div className="px-8 py-6 max-w-5xl">
        {/* Tool selector */}
        <div className="flex items-center gap-2 mb-8">
          {([
            { id: 'email', label: 'Email Generator', icon: Sparkles, desc: 'Tailored application emails' },
            { id: 'cv', label: 'CV Optimizer', icon: FileText, desc: 'Customize for each job' },
          ] as const).map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id); setResult('') }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all font-body"
              style={
                activeTool === tool.id
                  ? { background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.25)', color: '#F5A623' }
                  : { background: 'rgba(255,255,255,0.03)', border: '1px solid #1E2230', color: '#8892A4' }
              }
            >
              <tool.icon className="w-4 h-4" />
              <div className="text-left">
                <p className="text-sm font-medium leading-none">{tool.label}</p>
                <p className="text-[10px] mt-0.5 opacity-70">{tool.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-amber/10 flex items-center justify-center">
                  <Wand2 className="w-3.5 h-3.5 text-amber" />
                </div>
                <h2 className="font-display font-semibold text-sm text-text-primary">
                  {activeTool === 'email' ? 'Generate Application Email' : 'Optimize CV for Job'}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="input-label">Job Description *</label>
                  <textarea
                    className="textarea"
                    placeholder="Paste the full job description here. The more detail, the better the output..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                  />
                  <p className="text-[10px] text-text-muted font-body mt-1">
                    {jobDescription.length} characters
                  </p>
                </div>

                {activeTool === 'email' && (
                  <>
                    <div>
                      <label className="input-label">Tone</label>
                      <div className="flex gap-2">
                        {(['professional', 'enthusiastic', 'concise'] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setTone(t)}
                            className="flex-1 py-2 rounded-xl text-xs font-medium font-body capitalize transition-all"
                            style={
                              tone === t
                                ? { background: 'rgba(245,166,35,0.12)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.25)' }
                                : { background: 'rgba(255,255,255,0.03)', color: '#8892A4', border: '1px solid #1E2230' }
                            }
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="input-label">Additional Context (optional)</label>
                      <textarea
                        className="textarea"
                        placeholder="e.g. I worked on a similar project, I know the hiring manager..."
                        value={additionalContext}
                        onChange={(e) => setAdditionalContext(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isPending || !jobDescription.trim()}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-amber-glow"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div>
            <div className="card p-6 h-full min-h-[400px] relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center border border-border">
                    <Sparkles className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                  <h2 className="font-display font-semibold text-sm text-text-primary">AI Output</h2>
                </div>
                {result && (
                  <button onClick={handleCopy} className="btn-secondary px-3 py-1.5 text-xs gap-1.5">
                    {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isPending ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-64 gap-4"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-amber/10 border border-amber/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-amber animate-pulse-amber" />
                      </div>
                    </div>
                    <p className="text-text-muted text-sm font-body">Generating your content...</p>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-amber/60"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <pre
                      className="text-sm text-text-secondary font-body whitespace-pre-wrap leading-relaxed overflow-auto max-h-[500px]"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {result}
                    </pre>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-border flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-text-muted" />
                    </div>
                    <p className="font-display font-semibold text-text-secondary text-sm mb-1">
                      Ready to generate
                    </p>
                    <p className="text-text-muted text-xs font-body max-w-xs">
                      Paste a job description and click generate to get your tailored content
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
