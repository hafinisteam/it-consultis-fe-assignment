import { PokemonFilterTyped } from '@/types/pokemon'
import { type ResponseList } from '@/types/response'
import React from 'react'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { getTypesFromParams } from '@/lib/common'
import { FilterTypeList } from '../composite/FilterTypeList'

interface FilterContainerProps {
  totalResultCount: number
  handleSelectType: (typeName: string) => void
}

export const FilterContainer = ({
  totalResultCount,
  handleSelectType,
}: FilterContainerProps) => {
  const searchParams = useSearchParams()
  const selectedTypes = getTypesFromParams(searchParams)

  const { data, isLoading } = useSWR<ResponseList<PokemonFilterTyped>>('/type')

  return (
    <FilterTypeList
      total={totalResultCount || 0}
      filterTypesData={data?.results || []}
      selectedTypes={selectedTypes}
      isLoading={isLoading}
      handleSelectType={handleSelectType}
    />
  )
}
