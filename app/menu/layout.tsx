import React from 'react'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <main className="h-full w-full">
      {children}
    </main>
  )
}
