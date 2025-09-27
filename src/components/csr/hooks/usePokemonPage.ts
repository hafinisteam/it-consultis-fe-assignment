import { getPageFromParams, getTypesFromParams } from '@/lib/common'
import { urlBuilder } from '@/lib/url'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePokemonData } from './usePokemonData'
import { AppRoutes } from '@/config'

export const usePokemonPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stringifiedParams = searchParams.toString()
  const currentPage = getPageFromParams(searchParams)
  const typesFromParams = getTypesFromParams(searchParams)

  const { totalItems, listData, listDataError, isListDataLoading } =
    usePokemonData()

  const onTypeSelect = (type: string) => {
    const newUrl = urlBuilder.buildTypeToggleUrl(
      {
        currentParams: stringifiedParams,
        basePath: AppRoutes.POKEMON_CSR,
      },
      type,
      typesFromParams
    )

    router.push(newUrl)
  }

  const onNextPage = () => {
    const newUrl = urlBuilder.buildNextPageUrl(
      {
        currentParams: stringifiedParams,
        basePath: AppRoutes.POKEMON_CSR,
      },
      currentPage
    )

    router.push(newUrl)
  }

  const onPreviousPage = () => {
    const newUrl = urlBuilder.buildPreviousPageUrl(
      {
        currentParams: stringifiedParams,
        basePath: AppRoutes.POKEMON_CSR,
      },
      currentPage
    )

    if (newUrl) {
      router.push(newUrl)
    }
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
