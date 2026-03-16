'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl text-text-primary mb-2">Start hunting smarter</h1>
          <p className="text-text-muted text-sm font-body">Create your free account</p>
        </div>
        <SignUp
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
            },
          }}
        />
      </div>
    </div>
  )
}
