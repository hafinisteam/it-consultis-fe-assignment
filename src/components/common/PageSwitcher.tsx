'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const PageSwitcher = () => {
  const pathname = usePathname()
  const isSSR = pathname.includes('/pokemon-ssr')
  const targetPath = isSSR ? '/pokemon-csr' : '/pokemon-ssr'

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        href={targetPath}
        className={clsx(
          'bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2',
          'rounded-lg shadow-lg transition-colors font-medium'
        )}
      >
        Switch to {isSSR ? 'CSR' : 'SSR'}
      </Link>
    </div>
  )
}
