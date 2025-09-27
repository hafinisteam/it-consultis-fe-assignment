import { AppRoutes } from '@/config'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect(AppRoutes.POKEMON_CSR)
}
