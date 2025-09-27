import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import { extractPokedexNumber } from '@/lib/common'
import { PokemonItemTyped } from '@/types/pokemon'

interface PokemonListProps {
  results: PokemonItemTyped[]
  isLoading?: boolean
}

export const PokemonList = ({ results, isLoading }: PokemonListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="p-4 shadow rounded-lg flex flex-col items-center border-slate-200 border animate-pulse"
          >
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded my-2" />
            <div className="h-20 w-20 bg-gray-200 rounded mb-2" />
          </div>
        ))}
      </div>
    )
  }
  if (results.length === 0) {
    return (
      <p className="text-center col-span-full p-8 text-3xl font-bold">
        No Pokémon found.
      </p>
    )
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {results.map((pokemon: PokemonItemTyped) => {
        const pokemonNumber = extractPokedexNumber(pokemon.url)
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`
        return (
          <div
            className={clsx(
              'p-4 shadow rounded-lg flex flex-col',
              'items-center border-slate-200 border'
            )}
            key={pokemon.name}
          >
            <h3 className="capitalize text-center mb-2">{pokemon.name}</h3>
            <p>#{pokemonNumber}</p>
            <Image src={imageUrl} alt={pokemon.name} width={100} height={100} />
          </div>
        )
      })}
    </div>
  )
}
