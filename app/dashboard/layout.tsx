import React from 'react'
import AdminNav from '../components/header/admin/nav'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <>
        <AdminNav />
        <main className="w-full">
          {children}
        </main>
    </>
  )
}
