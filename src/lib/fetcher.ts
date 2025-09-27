export const fetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_POKEAPI_URL}${url}`).then((r) => r.json())

export const fetchWithMultipleTypes = <T>(url: string, types: string[]) =>
  Promise.all(
    types.map((type) =>
      fetch(`${url}${type}`).then(async (response) => {
        const result = await response.json()
        return result as T
      })
    )
  )
