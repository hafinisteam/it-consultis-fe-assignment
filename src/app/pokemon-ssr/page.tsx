import { Title } from '@/components/base'
import { PokemonList } from '@/components/composite'
import { SSRFilterContainer } from '@/components/ssr/SSRFilterContainer'
import { SSRPagination } from '@/components/ssr/SSRPagination'
import { PageSwitcher } from '@/components/common/PageSwitcher'
import { getPokemonSSRData } from '@/components/ssr/utils/serverDataFetching'
import { AppRoutes } from '@/config'
import { Suspense } from 'react'

// Force dynamic rendering since we use searchParams
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  const { pokemonData, availableTypes, totalItems } = await getPokemonSSRData(
    searchParams
  )

  return (
    <Suspense fallback={<>...</>}>
      <div className="min-h-screen p-8">
        <div className="container mx-auto space-y-6">
          <Title>Pokemon SSR Page</Title>

          <SSRFilterContainer
            availablePokemonTypes={availableTypes}
            totalResultCount={totalItems}
            basePath={AppRoutes.POKEMON_SSR}
          />

          <PokemonList results={pokemonData} />

          <SSRPagination total={totalItems} basePath={AppRoutes.POKEMON_SSR} />
        </div>
      </div>

      {/* CSR/SSR Page Switcher */}
      <PageSwitcher />
    </Suspense>
  )
}
