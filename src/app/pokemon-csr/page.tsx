'use client'

import { SWRConfig } from 'swr'

import { Title } from '@/components/base'
import { Pagination, PokemonList } from '@/components/composite'
import { FilterContainer } from '@/components/csr/FilterContainer'
import { PageSwitcher } from '@/components/common/PageSwitcher'
import { usePokemonPage } from '@/components/csr/hooks/usePokemonPage'
import { fetcher } from '@/lib/fetcher'
import { Suspense } from 'react'

function PokemonPage() {
  const {
    currentPage,
    isPokemonLoading,
    pokemonData,
    totalItems,
    onTypeSelect,
    onNextPage,
    onPreviousPage,
  } = usePokemonPage()

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto space-y-6">
        <Title>Pokemon CSR Page</Title>
        <FilterContainer
          onTypeSelect={onTypeSelect}
          totalResultCount={totalItems}
        />
        <PokemonList results={pokemonData || []} isLoading={isPokemonLoading} />
        <Pagination
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          total={totalItems}
        />
      </div>

      {/* CSR/SSR Page Switcher */}
      <PageSwitcher />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<>...</>}>
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
        <PokemonPage />
      </SWRConfig>
    </Suspense>
  )
}
