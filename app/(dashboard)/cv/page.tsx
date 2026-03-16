'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { TopBar } from '@/components/layout/TopBar'
import { useCV, useUpdateCV } from '@/hooks/useCV'
import { Plus, Trash2, Save, Loader2, Briefcase, GraduationCap, Code2, Wrench, Languages, Award } from 'lucide-react'
import { CVExperience, CVEducation, CVProject } from '@/types'
import toast from 'react-hot-toast'

type TabId = 'basics' | 'experience' | 'education' | 'projects' | 'skills'

const tabs: Array<{ id: TabId; label: string; icon: React.ElementType }> = [
  { id: 'basics', label: 'Basics', icon: Wrench },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'skills', label: 'Skills', icon: Award },
]

export default function CVPage() {
  const { data: cv, isLoading } = useCV()
  const updateCV = useUpdateCV()
  const [activeTab, setActiveTab] = useState<TabId>('basics')

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [skills, setSkills] = useState('')
  const [languages, setLanguages] = useState('')
  const [certifications, setCertifications] = useState('')
  const [experiences, setExperiences] = useState<CVExperience[]>([])
  const [education, setEducation] = useState<CVEducation[]>([])
  const [projects, setProjects] = useState<CVProject[]>([])

  useEffect(() => {
    if (cv) {
      setTitle(cv.title || '')
      setSummary(cv.summary || '')
      setSkills(cv.skills?.join(', ') || '')
      setLanguages(cv.languages?.join(', ') || '')
      setCertifications(cv.certifications?.join(', ') || '')
      setExperiences(cv.experiences || [])
      setEducation(cv.education || [])
      setProjects(cv.projects || [])
    }
  }, [cv])

  const handleSave = async () => {
    await updateCV.mutateAsync({
      title,
      summary,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      languages: languages.split(',').map((s) => s.trim()).filter(Boolean),
      certifications: certifications.split(',').map((s) => s.trim()).filter(Boolean),
      experiences,
      education,
      projects,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-amber" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TopBar
        title="My CV"
        subtitle="Your professional profile — used by AI to tailor applications"
        action={
          <button
            onClick={handleSave}
            disabled={updateCV.isPending}
            className="btn-primary text-xs px-4 py-2 disabled:opacity-50"
          >
            {updateCV.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save CV
          </button>
        }
      />

      <div className="px-8 py-6 max-w-4xl">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-border pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium font-body transition-all relative"
              style={{ color: activeTab === tab.id ? '#F5A623' : '#8892A4' }}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          {/* BASICS */}
          {activeTab === 'basics' && (
            <>
              <div className="card p-6 space-y-4">
                <div>
                  <label className="input-label">Professional Title</label>
                  <input className="input" placeholder="e.g. Full Stack Developer" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="input-label">Professional Summary</label>
                  <textarea className="textarea" placeholder="Write a compelling 2-3 sentence summary..." value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} />
                </div>
              </div>
              <div className="card p-6 space-y-4">
                <div>
                  <label className="input-label">Languages (comma separated)</label>
                  <input className="input" placeholder="English, Bengali, Arabic..." value={languages} onChange={(e) => setLanguages(e.target.value)} />
                </div>
                <div>
                  <label className="input-label">Certifications (comma separated)</label>
                  <input className="input" placeholder="AWS Certified, Google Cloud..." value={certifications} onChange={(e) => setCertifications(e.target.value)} />
                </div>
              </div>
            </>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
            <div className="card p-6">
              <label className="input-label">Skills (comma separated)</label>
              <textarea
                className="textarea"
                placeholder="React, TypeScript, Node.js, MongoDB, Docker, AWS..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={6}
              />
              {skills && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.split(',').map((s) => s.trim()).filter(Boolean).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-medium font-body"
                      style={{ background: 'rgba(245,166,35,0.08)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.15)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === 'experience' && (
            <>
              {experiences.map((exp, i) => (
                <div key={i} className="card p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-sm text-text-primary">Experience #{i + 1}</h3>
                    <button onClick={() => setExperiences(experiences.filter((_, j) => j !== i))} className="btn-ghost p-1.5 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="input-label">Position</label><input className="input" value={exp.position} onChange={(e) => { const n = [...experiences]; n[i] = { ...n[i], position: e.target.value }; setExperiences(n) }} /></div>
                    <div><label className="input-label">Company</label><input className="input" value={exp.company} onChange={(e) => { const n = [...experiences]; n[i] = { ...n[i], company: e.target.value }; setExperiences(n) }} /></div>
                  </div>
                  <div><label className="input-label">Description</label><textarea className="textarea" rows={3} value={exp.description} onChange={(e) => { const n = [...experiences]; n[i] = { ...n[i], description: e.target.value }; setExperiences(n) }} /></div>
                  <div><label className="input-label">Technologies (comma separated)</label><input className="input" value={exp.technologies?.join(', ')} onChange={(e) => { const n = [...experiences]; n[i] = { ...n[i], technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) }; setExperiences(n) }} /></div>
                </div>
              ))}
              <button
                onClick={() => setExperiences([...experiences, { company: '', position: '', startDate: new Date().toISOString(), current: true, description: '', technologies: [] }])}
                className="btn-secondary w-full justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </>
          )}

          {/* EDUCATION */}
          {activeTab === 'education' && (
            <>
              {education.map((edu, i) => (
                <div key={i} className="card p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-sm text-text-primary">Education #{i + 1}</h3>
                    <button onClick={() => setEducation(education.filter((_, j) => j !== i))} className="btn-ghost p-1.5 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="input-label">Institution</label><input className="input" value={edu.institution} onChange={(e) => { const n = [...education]; n[i] = { ...n[i], institution: e.target.value }; setEducation(n) }} /></div>
                    <div><label className="input-label">Degree</label><input className="input" value={edu.degree} onChange={(e) => { const n = [...education]; n[i] = { ...n[i], degree: e.target.value }; setEducation(n) }} /></div>
                    <div><label className="input-label">Field of Study</label><input className="input" value={edu.field} onChange={(e) => { const n = [...education]; n[i] = { ...n[i], field: e.target.value }; setEducation(n) }} /></div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setEducation([...education, { institution: '', degree: '', field: '', startDate: new Date().toISOString(), current: false }])}
                className="btn-secondary w-full justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </>
          )}

          {/* PROJECTS */}
          {activeTab === 'projects' && (
            <>
              {projects.map((proj, i) => (
                <div key={i} className="card p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-sm text-text-primary">Project #{i + 1}</h3>
                    <button onClick={() => setProjects(projects.filter((_, j) => j !== i))} className="btn-ghost p-1.5 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div><label className="input-label">Project Name</label><input className="input" value={proj.name} onChange={(e) => { const n = [...projects]; n[i] = { ...n[i], name: e.target.value }; setProjects(n) }} /></div>
                  <div><label className="input-label">Description</label><textarea className="textarea" rows={3} value={proj.description} onChange={(e) => { const n = [...projects]; n[i] = { ...n[i], description: e.target.value }; setProjects(n) }} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="input-label">Live URL</label><input className="input" value={proj.url || ''} onChange={(e) => { const n = [...projects]; n[i] = { ...n[i], url: e.target.value }; setProjects(n) }} /></div>
                    <div><label className="input-label">GitHub URL</label><input className="input" value={proj.github || ''} onChange={(e) => { const n = [...projects]; n[i] = { ...n[i], github: e.target.value }; setProjects(n) }} /></div>
                  </div>
                  <div><label className="input-label">Technologies</label><input className="input" value={proj.technologies?.join(', ')} onChange={(e) => { const n = [...projects]; n[i] = { ...n[i], technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) }; setProjects(n) }} /></div>
                </div>
              ))}
              <button
                onClick={() => setProjects([...projects, { name: '', description: '', technologies: [] }])}
                className="btn-secondary w-full justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </>
          )}
        </motion.div>

        {/* Sticky save at bottom */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={updateCV.isPending}
            className="btn-primary px-8 py-3 shadow-amber-glow"
          >
            {updateCV.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
