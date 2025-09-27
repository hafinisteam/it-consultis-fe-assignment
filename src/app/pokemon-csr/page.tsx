'use client'

import { SWRConfig } from 'swr'

import { Title } from '@/components/base'
import { Pagination, PokemonList } from '@/components/composite'
import { FilterContainer } from '@/components/csr/FilterContainer'
import { useCSRFilter } from '@/components/csr/hooks/useCSRFilter'
import { fetcher } from '@/lib/fetcher'

function PokemonCSRPage() {
  const {
    totalItems,
    currentPage,
    listData,
    isListDataLoading,
    onSelectType,
    onGoBack,
    onGoNext,
  } = useCSRFilter()

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto space-y-6">
        <Title>Pokemon CSR Page</Title>
        <FilterContainer
          totalResultCount={totalItems}
          handleSelectType={onSelectType}
        />
        <PokemonList results={listData || []} isLoading={isListDataLoading} />
        <Pagination
          total={totalItems}
          currentPage={currentPage}
          onGoNext={onGoNext}
          onGoBack={onGoBack}
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
