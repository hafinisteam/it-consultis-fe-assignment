import {
  extractPokemonMatchedTypes,
  getPageFromParams,
  getTypesFromParams,
} from '@/lib/common'
import { fetchWithMultipleTypes } from '@/lib/fetcher'
import { PokemonItemTyped } from '@/types/pokemon'
import { ResponseList, ResponseListType } from '@/types/response'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import useSWR from 'swr'

export const useListData = () => {
  const searchParams = useSearchParams()
  const currentPage = getPageFromParams(searchParams)
  const typesFromParams = getTypesFromParams(searchParams)

  // Fetch list of pokemon based on types in the params
  const {
    data: pokemonTypeDataList,
    isLoading: isPokemonTypeDataLoading,
    error: pokemonTypeDataListError,
  } = useSWR(
    // If there are types in the params, we will fetch the list based on those types
    // If no types, we will not fetch this
    typesFromParams.length ? { types: typesFromParams } : null,
    ({ types }) =>
      fetchWithMultipleTypes<ResponseListType<PokemonItemTyped>>(
        `${process.env.NEXT_PUBLIC_POKEAPI_URL}/type/`,
        types
      ).then((res) => extractPokemonMatchedTypes(res))
  )

  const {
    data: pokemonListData,
    error: pokemonListDataError,
    isLoading: isPokemonListLoading,
  } = useSWR<ResponseList<PokemonItemTyped>>(
    // If there are types in the params, we will not fetch the default list
    typesFromParams.length === 0
      ? `/pokemon?limit=24&offset=${(currentPage - 1) * 24}`
      : null
  )

  const totalItems = useMemo(() => {
    if (pokemonListData) {
      return pokemonListData.count
    }
    if (pokemonTypeDataList) {
      return pokemonTypeDataList.length
    }
    return 0
  }, [pokemonListData, pokemonTypeDataList])

  const listData = useMemo(() => {
    if (pokemonListData) {
      return pokemonListData.results
    }
    if (pokemonTypeDataList) {
      return pokemonTypeDataList.slice((currentPage - 1) * 24, currentPage * 24)
    }
  }, [currentPage, pokemonListData, pokemonTypeDataList])

  console.log({ pokemonListData, pokemonTypeDataList, currentPage })

  return {
    totalItems,
    listData,
    listDataError: pokemonListDataError || pokemonTypeDataListError,
    isListDataLoading: isPokemonListLoading || isPokemonTypeDataLoading,
  }
}
