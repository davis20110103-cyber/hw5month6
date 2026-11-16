import { useContext } from 'react'
import { RouterContext } from './routerContext.js'

export function useRouter() {
  const router = useContext(RouterContext)

  if (!router) {
    throw new Error('useRouter must be used inside NativeRouter')
  }

  return router
}
