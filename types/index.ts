export type JobStatus = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
export type JobType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship' | 'remote'

export interface Job {
  _id: string
  userId: string
  title: string
  company: string
  location: string
  jobType: JobType
  status: JobStatus
  url?: string
  description: string
  requirements: string[]
  salary?: { min?: number; max?: number; currency: string }
  tags: string[]
  notes: string
  source: string
  deadline?: string
  appliedAt?: string
  generatedEmail?: string
  generatedCVSummary?: string
  createdAt: string
  updatedAt: string
}

export interface JobStats {
  total: number
  saved: number
  applied: number
  interview: number
  offer: number
  rejected: number
  withdrawn: number
}

export interface CVData {
  title: string
  summary: string
  skills: string[]
  experiences: CVExperience[]
  education: CVEducation[]
  projects: CVProject[]
  languages: string[]
  certifications: string[]
  updatedAt: string
}

export interface CVExperience {
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  technologies: string[]
}

export interface CVEducation {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  current: boolean
}

export interface CVProject {
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  meta?: PaginationMeta
}
