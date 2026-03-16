'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Plus, Loader2 } from 'lucide-react'
import { useCreateJob } from '@/hooks/useJobs'

interface AddJobModalProps {
  open: boolean
  onClose: () => void
}

export function AddJobModal({ open, onClose }: AddJobModalProps) {
  const createJob = useCreateJob()
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: 'Remote',
    url: '',
    description: '',
    tags: '',
    notes: '',
    jobType: 'full-time',
  })

  const handleSubmit = async () => {
    if (!form.title || !form.company || !form.description) return

    await createJob.mutateAsync({
      ...form,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    })
    setForm({ title: '', company: '', location: 'Remote', url: '', description: '', tags: '', notes: '', jobType: 'full-time' })
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="fixed inset-x-4 top-[50%] -translate-y-1/2 z-50 max-w-lg mx-auto"
          >
            <div
              className="card p-6 max-h-[85vh] overflow-y-auto"
              style={{ background: '#181B23' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-lg text-text-primary">Save a Job</h2>
                  <p className="text-xs text-text-muted font-body mt-0.5">Add a new job to track</p>
                </div>
                <button onClick={onClose} className="btn-ghost p-2 rounded-xl">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="input-label">Job Title *</label>
                    <input
                      className="input"
                      placeholder="e.g. Senior React Dev"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="input-label">Company *</label>
                    <input
                      className="input"
                      placeholder="e.g. Stripe"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="input-label">Location</label>
                    <input
                      className="input"
                      placeholder="Remote"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="input-label">Job Type</label>
                    <select
                      className="input"
                      value={form.jobType}
                      onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                    >
                      {['full-time', 'part-time', 'contract', 'freelance', 'remote', 'internship'].map((t) => (
                        <option key={t} value={t} className="bg-surface capitalize">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="input-label">Job URL</label>
                  <input
                    className="input"
                    placeholder="https://..."
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                  />
                </div>

                <div>
                  <label className="input-label">Job Description *</label>
                  <textarea
                    className="textarea"
                    placeholder="Paste the full job description here..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={5}
                  />
                </div>

                <div>
                  <label className="input-label">Tags (comma separated)</label>
                  <input
                    className="input"
                    placeholder="React, TypeScript, Node.js"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  />
                </div>

                <div>
                  <label className="input-label">Notes</label>
                  <textarea
                    className="textarea"
                    placeholder="Any notes about this job..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
                  <button
                    onClick={handleSubmit}
                    disabled={createJob.isPending || !form.title || !form.company || !form.description}
                    className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createJob.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <><Plus className="w-4 h-4" /> Save Job</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
