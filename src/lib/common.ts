import { DEFAULT_PAGE } from '@/config'
import { PokemonItemTyped } from '@/types/pokemon'
import { ResponseListType } from '@/types/response'
import { ReadonlyURLSearchParams } from 'next/navigation'

export function getTypesFromParams(typeParams: ReadonlyURLSearchParams | null) {
  if (!typeParams) return []
  return typeParams.get('type')?.split(',') || []
}

export function getPageFromParams(pageParams: ReadonlyURLSearchParams | null) {
  if (!pageParams) return DEFAULT_PAGE
  return pageParams.get('page')
    ? parseInt(pageParams.get('page') as string, 10)
    : DEFAULT_PAGE
}

// Should fit at least 2 types
export function extractPokemonMatchedTypes(
  data: ResponseListType<PokemonItemTyped>[]
): PokemonItemTyped[] {
  // If only one type, return the list directly
  if (data.length < 2) return data[0].pokemon.map((p) => p.pokemon)

  // If multiple types, we need to pick pokemon appears in at least each list 2 times
  const pokemonCountMap: Record<
    string,
    { url: string; count: number; pokedexNumber: number }
  > = {}

  data.forEach((typeData) => {
    typeData.pokemon.forEach(({ pokemon }) => {
      if (pokemonCountMap[pokemon.name]) {
        pokemonCountMap[pokemon.name].count += 1
      } else {
        pokemonCountMap[pokemon.name] = {
          url: pokemon.url,
          count: 1,
          // Save pokedex number for sorting later
          pokedexNumber: extractPokedexNumber(pokemon.url),
        }
      }
    })
  })

  // Filter pokemon that appear in at least 2 types
  return Object.entries(pokemonCountMap)
    .filter(([, value]) => value.count >= 2)
    .sort((a, b) => a[1].pokedexNumber - b[1].pokedexNumber)
    .map(([name, value]) => ({ name, url: value.url }))
}

export function extractPokedexNumber(url: string): number {
  return Number(url.replace(/\/$/, '').split('/').pop() || '0')
}
