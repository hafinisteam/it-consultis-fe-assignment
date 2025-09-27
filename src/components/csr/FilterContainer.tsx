import { useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

import { getTypesFromParams } from '@/lib/common'
import { PokemonFilterTyped } from '@/types/pokemon'
import { type ResponseList } from '@/types/response'

import { FilterTypeList } from '../composite'

interface FilterContainerProps {
  totalResultCount: number
  onTypeSelect: (typeName: string) => void
}

export const FilterContainer = ({
  totalResultCount,
  onTypeSelect,
}: FilterContainerProps) => {
  const searchParams = useSearchParams()
  const selectedTypes = getTypesFromParams(searchParams)

  const { data: availablePokemonTypesData, isLoading: isLoadingTypes } =
    useSWR<ResponseList<PokemonFilterTyped>>('/type')

  return (
    <FilterTypeList
      availablePokemonTypes={availablePokemonTypesData?.results || []}
      isLoadingTypes={isLoadingTypes}
      onTypeSelect={onTypeSelect}
      selectedTypes={selectedTypes}
      totalResultCount={totalResultCount}
    />
  )
}
