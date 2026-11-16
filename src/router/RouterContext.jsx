import { useCallback, useEffect, useState } from 'react'
import { RouterContext } from './routerContext.js'

export function NativeRouter({ children }) {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to, options = {}) => {
    const method = options.replace ? 'replaceState' : 'pushState'
    window.history[method]({}, '', to)
    setPathname(window.location.pathname)
    window.scrollTo(0, 0)
  }, [])

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}
