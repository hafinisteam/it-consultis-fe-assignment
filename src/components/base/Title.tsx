import React from 'react'

export const Title = ({children} : {children: React.ReactNode}) => {
  return (
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{children}</h2>
  )
}
