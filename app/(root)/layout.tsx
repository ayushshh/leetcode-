// app/(root)/layout.tsx
import Navbar from '@/modules/home/components/Navbar'
import React from 'react'
import { currentUserRole } from "@/modules/auth/actions";

export default async function RootLayout({children}: {children : React.ReactNode}) {
  const userRole = await currentUserRole();

  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar userRole={userRole as "USER" | "ADMIN"}/>
      <div className='flex-1 flex flex-col px-4 pb-4 relative'>
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-50/50 via-white to-indigo-50/30 dark:from-neutral-950 dark:via-neutral-900/80 dark:to-neutral-950">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-400/20 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-400/20 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
        {children}
      </div>
    </main>
  )
}