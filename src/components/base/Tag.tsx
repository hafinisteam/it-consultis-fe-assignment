import clsx from 'clsx'
import React from 'react'

type TagProps = {
  type: string
  isActive: boolean
  onClick: () => void
}

export function Tag({ type, isActive, onClick }: TagProps) {
  const baseClasses =
    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-md transform hover:cursor-pointer focus:outline-none border border-gray-200'
  const activeClasses = 'bg-indigo-600 text-white hover:bg-indigo-700'
  const inactiveClasses = 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'

  return (
    <button
      type='button'
      onClick={onClick}
      className={clsx(baseClasses, isActive ? activeClasses : inactiveClasses)}
    >
      {type}
    </button>
  )
}
