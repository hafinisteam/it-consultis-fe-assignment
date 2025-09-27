'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { urlBuilder } from '@/lib/url'
import { getPageFromParams } from '@/lib/common'
import { Pagination } from '@/components/composite'

interface SSRPaginationProps {
  total: number
  basePath: string
}

export const SSRPagination = ({ total, basePath }: SSRPaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = getPageFromParams(searchParams)

  const handlePreviousClick = () => {
    const newUrl = urlBuilder.buildPreviousPageUrl(
      {
        currentParams: searchParams.toString(),
        basePath,
      },
      currentPage
    )

    if (newUrl) {
      router.push(newUrl)
    }
  }

  const handleNextClick = () => {
    const newUrl = urlBuilder.buildNextPageUrl(
      {
        currentParams: searchParams.toString(),
        basePath,
      },
      currentPage
    )

    router.push(newUrl)
  }

  // Reuse existing Pagination component with URL manipulation functions
  return (
    <Pagination
      total={total}
      currentPage={currentPage}
      onNextPage={handleNextClick}
      onPreviousPage={handlePreviousClick}
    />
  )
}
