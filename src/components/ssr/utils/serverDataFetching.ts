import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/config'
import { extractPokemonMatchedTypes } from '@/lib/common'
import { fetcher, fetchWithMultipleTypes } from '@/lib/fetcher'
import { PokemonFilterTyped, PokemonItemTyped } from '@/types/pokemon'
import { ResponseList, ResponseListType } from '@/types/response'

/**
 * Server-side data fetching for Pokemon SSR page
 * Replicates the logic from useListData hook
 */

async function fetchPokemonTypes(): Promise<PokemonFilterTyped[]> {
  try {
    const data: ResponseList<PokemonFilterTyped> = await fetcher('/type')
    return data.results
  } catch (error) {
    console.error('Error fetching Pokemon types:', error)
    return []
  }
}

async function fetchPokemonList(
  page: number,
  limit: number
): Promise<ResponseList<PokemonItemTyped>> {
  try {
    const offset = (page - 1) * limit
    const data: ResponseList<PokemonItemTyped> = await fetcher(
      `/pokemon?limit=${limit}&offset=${offset}`
    )
    return data
  } catch (error) {
    console.error('Error fetching Pokemon list:', error)
    return { count: 0, results: [], next: null, previous: null }
  }
}

async function fetchPokemonByTypes(
  types: string[]
): Promise<ResponseListType<PokemonItemTyped>[]> {
  try {
    const data = await fetchWithMultipleTypes<
      ResponseListType<PokemonItemTyped>
    >(`${process.env.NEXT_PUBLIC_POKEAPI_URL}/type/`, types)
    return data
  } catch (error) {
    console.error('Error fetching Pokemon by types:', error)
    return []
  }
}

export async function getPokemonSSRData(searchParams: {
  [key: string]: string | string[] | undefined
}) {
  try {
    // 1. Extract URL parameters (same logic as CSR)
    const typesFromParams = searchParams.type
      ? String(searchParams.type).split(',')
      : []
    const currentPage = searchParams.page
      ? parseInt(String(searchParams.page), 10)
      : DEFAULT_PAGE

    // 2. Fetch available Pokemon types (always needed for filter)
    const availableTypes = await fetchPokemonTypes()

    // 3. Conditional Pokemon data fetching (same as useListData logic)
    let pokemonData: PokemonItemTyped[] = []
    let totalItems = 0

    if (typesFromParams.length === 0) {
      // No types selected -> fetch regular paginated list
      const response = await fetchPokemonList(currentPage, DEFAULT_LIMIT)
      pokemonData = response.results
      totalItems = response.count
    } else {
      // Types selected -> fetch by types, filter, then paginate
      const typeResponses = await fetchPokemonByTypes(typesFromParams)
      const allMatchedPokemon = extractPokemonMatchedTypes(typeResponses) // Reuse existing function!

      // Server-side pagination of filtered results
      const offset = (currentPage - 1) * DEFAULT_LIMIT
      pokemonData = allMatchedPokemon.slice(offset, offset + DEFAULT_LIMIT)
      totalItems = allMatchedPokemon.length
    }

    // 4. Return all data needed by page components
    return {
      pokemonData, // For PokemonList
      availableTypes, // For SSRFilterContainer
      totalItems, // For both SSRFilterContainer + SSRPagination
      currentPage, // For SSRPagination (though it can get from URL too)
      selectedTypes: typesFromParams, // For SSRFilterContainer
    }
  } catch (error) {
    console.error('SSR data fetch error:', error)
    return {
      pokemonData: [], // Empty array fallback
      availableTypes: [], // Empty array fallback
      totalItems: 0,
      currentPage: DEFAULT_PAGE,
      selectedTypes: [],
    }
  }
}
