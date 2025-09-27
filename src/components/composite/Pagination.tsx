import { DEFAULT_LIMIT } from '@/config'
import clsx from 'clsx'
import React from 'react'

interface PaginationProps {
  total: number
  currentPage: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export const Pagination = ({
  total,
  currentPage,
  onNextPage,
  onPreviousPage,
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
        <button onClick={onPreviousPage} className={buttonClasses}>
          Previous
        </button>
      )}

      {/* Next button - only show if not on last page */}
      {currentPage < totalPages && (
        <button onClick={onNextPage} className={buttonClasses}>
          Next
        </button>
      )}
    </div>
  )
}
