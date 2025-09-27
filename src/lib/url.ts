import { DEFAULT_PAGE } from '@/config'

/**
 * URL manipulation utilities extracted from useCSRFilter for reuse in SSR client components
 */

interface UrlBuilderParams {
  currentParams: string
  basePath: string
}

export const urlBuilder = {
  /**
   * Toggle type selection and return new URL
   */
  buildTypeToggleUrl(
    { currentParams, basePath }: UrlBuilderParams,
    type: string,
    currentTypes: string[]
  ): string {
    const params = new URLSearchParams(currentParams)

    // Toggle type selection (add if not present, remove if present)
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type]

    // Handle case when no types are selected
    if (newTypes.length === 0) {
      params.delete('type')
      return basePath
    }

    // Set new type parameters and reset to first page
    params.set('type', newTypes.sort().join(','))
    params.set('page', DEFAULT_PAGE.toString())

    return `${basePath}?${params.toString()}`
  },

  /**
   * Build next page URL
   */
  buildNextPageUrl(
    { currentParams, basePath }: UrlBuilderParams,
    currentPage: number
  ): string {
    const params = new URLSearchParams(currentParams)
    params.set('page', (currentPage + 1).toString())
    return `${basePath}?${params.toString()}`
  },

  /**
   * Build previous page URL
   */
  buildPreviousPageUrl(
    { currentParams, basePath }: UrlBuilderParams,
    currentPage: number
  ): string | null {
    if (currentPage === 1) return null

    const params = new URLSearchParams(currentParams)
    params.set('page', (currentPage - 1).toString())
    return `${basePath}?${params.toString()}`
  },
}
