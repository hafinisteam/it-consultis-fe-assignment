import { getPageFromParams, getTypesFromParams } from '@/lib/common'
import { useRouter, useSearchParams } from 'next/navigation'
import { useListData } from './useListData'
import { DEFAULT_PAGE } from '@/config'

export const useCSRFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stringifiedParams = searchParams.toString()
  const currentPage = getPageFromParams(searchParams)
  const typesFromParams = getTypesFromParams(searchParams)

  const { totalItems, listData, listDataError, isListDataLoading } =
    useListData()

  const onTypeSelect = (type: string) => {
    const params = new URLSearchParams(stringifiedParams)

    // Toggle type selection (add if not present, remove if present)
    const newTypes = typesFromParams.includes(type)
      ? typesFromParams.filter((t) => t !== type)
      : [...typesFromParams, type]

    // Handle case when no types are selected
    if (newTypes.length === 0) {
      params.delete('type')
      router.push('/pokemon-csr')
      return
    }

    // Set new type parameters and reset to first page
    params.set('type', newTypes.sort().join(','))
    params.set('page', DEFAULT_PAGE.toString())

    router.push(`?${params.toString()}`)
  }

  const onNextPage = () => {
    const params = new URLSearchParams(stringifiedParams)

    params.set('page', (currentPage + 1).toString())
    router.push(`?${params.toString()}`)
  }

  const onPreviousPage = () => {
    const params = new URLSearchParams(stringifiedParams)

    if (currentPage === 1) return

    params.set('page', (currentPage - 1).toString())
    router.push(`?${params.toString()}`)
  }

  return {
    currentPage,
    isPokemonLoading: isListDataLoading,
    pokemonData: listData,
    pokemonError: listDataError,
    totalItems,
    onTypeSelect,
    onNextPage,
    onPreviousPage,
  }
}
