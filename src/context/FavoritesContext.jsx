import { useCallback, useMemo, useState } from 'react'
import { FavoritesContext } from './favoritesContext.js'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = useCallback((post) => {
    setFavorites((currentFavorites) => (
      currentFavorites.some((favorite) => favorite.id === post.id)
        ? currentFavorites
        : [...currentFavorites, post]
    ))
  }, [])

  const removeFavorite = useCallback((postId) => {
    setFavorites((currentFavorites) => (
      currentFavorites.filter((favorite) => favorite.id !== postId)
    ))
  }, [])

  const clearFavorites = useCallback(() => setFavorites([]), [])

  const value = useMemo(() => ({
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
  }), [favorites, addFavorite, removeFavorite, clearFavorites])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
