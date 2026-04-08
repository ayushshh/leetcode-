import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <main className='flex flex-col justify-center items-center h-screen'>{children}</main>
  )
}

export default layout