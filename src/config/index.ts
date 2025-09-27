export const DEFAULT_LIMIT = 24
export const DEFAULT_PAGE = 1

export const AppRoutes = {
  HOME: '/',
  POKEMON_CSR: '/pokemon-csr',
  POKEMON_SSR: '/pokemon-ssr',
}

export const POKEAPI_URL =
  process.env.NEXT_PUBLIC_POKEAPI_URL || 'https://pokeapi.co/api/v2'
