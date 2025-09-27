'use client'

import { SWRConfig } from 'swr'

import { Title } from '@/components/base'
import { Pagination, PokemonList } from '@/components/composite'
import { FilterContainer } from '@/components/csr/FilterContainer'
import { useCSRFilter } from '@/components/csr/hooks/useCSRFilter'
import { fetcher } from '@/lib/fetcher'

function PokemonCSRPage() {
  const {
    currentPage,
    isPokemonLoading,
    pokemonData,
    totalItems,
    onTypeSelect,
    onNextPage,
    onPreviousPage,
  } = useCSRFilter()

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto space-y-6">
        <Title>Pokemon CSR Page</Title>
        <FilterContainer
          totalResultCount={totalItems}
          onTypeSelect={onTypeSelect}
        />
        <PokemonList results={pokemonData || []} isLoading={isPokemonLoading} />
        <Pagination
          total={totalItems}
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  )
}

export default function AppCSR() {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <PokemonCSRPage />
    </SWRConfig>
  )
}
