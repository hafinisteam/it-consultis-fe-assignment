import { DEFAULT_LIMIT } from '@/config'
import clsx from 'clsx'
import React from 'react'

interface PaginationProps {
  total: number
  currentPage: number
  onGoNext: () => void
  onGoBack: () => void
}

export const Pagination = ({
  total,
  currentPage,
  onGoNext,
  onGoBack,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / DEFAULT_LIMIT)
  const buttonClasses = clsx(
    'px-4 py-2 bg-indigo-600 text-white rounded',
    'hover:bg-indigo-500 transition-colors'
  )

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {/* Previous button - only show if not on first page */}
      {currentPage > 1 && (
        <button onClick={onGoBack} className={buttonClasses}>
          Previous
        </button>
      )}

      {/* Next button - only show if not on last page */}
      {currentPage < totalPages && (
        <button onClick={onGoNext} className={buttonClasses}>
          Next
        </button>
      )}
    </div>
  )
}
