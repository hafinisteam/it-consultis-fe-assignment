import { Tag, Title } from '@/components/base'

export default function PokemonSSRPage() {

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <Title>Pokemon SSR Page</Title>

        <p className="text-gray-600 dark:text-gray-400">This page uses Server-Side Rendering (SSR)</p>
      </div>
    </div>
  )
}
