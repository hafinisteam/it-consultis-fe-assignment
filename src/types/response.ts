// Default response list for non-pokemon-type query
export interface ResponseList<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Response structure for pokemon-type query
export interface ResponseListType<T> {
  pokemon: {
    pokemon: T
  }[]
}
