import { Title } from '@/components/base'
import { PokemonList } from '@/components/composite'
import { SSRFilterContainer } from '@/components/ssr/SSRFilterContainer'
import { SSRPagination } from '@/components/ssr/SSRPagination'
import { PageSwitcher } from '@/components/common/PageSwitcher'
import { getPokemonSSRData } from '@/components/ssr/utils/serverDataFetching'

interface PokemonSSRPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PokemonSSRPage({
  searchParams,
}: PokemonSSRPageProps) {
  const { pokemonData, availableTypes, totalItems } = await getPokemonSSRData(
    searchParams
  )

  return (
    <>
      <div className="min-h-screen p-8">
        <div className="container mx-auto space-y-6">
          <Title>Pokemon SSR Page</Title>

          <SSRFilterContainer
            availablePokemonTypes={availableTypes}
            totalResultCount={totalItems}
            basePath="/pokemon-ssr"
          />

          <PokemonList
            results={pokemonData}
            // No isLoading needed for SSR
          />

          <SSRPagination total={totalItems} basePath="/pokemon-ssr" />
        </div>
      </div>

      {/* CSR/SSR Page Switcher */}
      <PageSwitcher />
    </>
  )
}
