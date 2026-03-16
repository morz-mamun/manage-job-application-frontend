'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl text-text-primary mb-2">Welcome back</h1>
          <p className="text-text-muted text-sm font-body">Sign in to your job hunt command center</p>
        </div>
        <SignIn
          appearance={{
            variables: {
              colorBackground: '#111318',
              colorInputBackground: 'rgba(255,255,255,0.04)',
              colorInputText: '#F0F2F8',
              colorText: '#F0F2F8',
              colorTextSecondary: '#8892A4',
              colorPrimary: '#F5A623',
              colorDanger: '#EF4444',
              borderRadius: '12px',
              fontFamily: 'DM Sans, sans-serif',
            },
            elements: {
              card: 'bg-surface border border-border shadow-elevated',
              formButtonPrimary: 'btn-primary',
            },
          }}
        />
      </div>
    </div>
  )
}
