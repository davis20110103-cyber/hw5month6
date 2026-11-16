import { Link } from './Link.jsx'
import { useFavorites } from '../context/useFavorites.js'

export const PageHeader = () => {
  const { favorites } = useFavorites()

  return (
    <header className="page-header">
      <Link to="/posts" className="brand-link" aria-label="На главную">
        <span className="brand-mark" aria-hidden="true">Ч</span>
        <span className="brand-copy">
          <span className="eyebrow">БЛОГ-ПЛАТФОРМА</span>
          <span className="brand-title">Читаем вместе</span>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Основная навигация">
        <Link to="/posts" className="nav-link">Посты</Link>
        <Link to="/favorites" className="nav-link">
          Избранное
          <span className="favorite-count">{favorites.length}</span>
        </Link>
      </nav>
    </header>
  )
}
