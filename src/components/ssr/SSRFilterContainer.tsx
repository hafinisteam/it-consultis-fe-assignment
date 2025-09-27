'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { urlBuilder } from '@/lib/url'
import { getTypesFromParams } from '@/lib/common'
import { FilterTypeList } from '@/components/composite'
import { PokemonFilterTyped } from '@/types/pokemon'

interface SSRFilterContainerProps {
  availablePokemonTypes: PokemonFilterTyped[]
  totalResultCount: number
  basePath: string
}

export const SSRFilterContainer = ({
  availablePokemonTypes,
  totalResultCount,
  basePath,
}: SSRFilterContainerProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTypes = getTypesFromParams(searchParams)

  const handleTypeSelect = (type: string) => {
    const newUrl = urlBuilder.buildTypeToggleUrl(
      {
        currentParams: searchParams.toString(),
        basePath,
      },
      type,
      selectedTypes
    )

    router.push(newUrl)
  }

  // Reuse existing FilterTypeList component
  return (
    <FilterTypeList
      availablePokemonTypes={availablePokemonTypes}
      isLoadingTypes={false} // No loading state needed for SSR
      selectedTypes={selectedTypes}
      totalResultCount={totalResultCount}
      onTypeSelect={handleTypeSelect}
    />
  )
}
