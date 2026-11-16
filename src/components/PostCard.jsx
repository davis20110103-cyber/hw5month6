import { Link } from './Link.jsx'
import { useFavorites } from '../context/useFavorites.js'

export function PostCard({ post, authorName }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const isFavorite = favorites.some((favorite) => favorite.id === post.id)

  return (
    <article className="post-card">
      <div className="post-card-main">
        <p className="post-kicker">ПОСТ №{String(post.id).padStart(2, '0')}</p>
        <h2 className="post-title">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
        <p className="post-author">
          Автор:{' '}
          <Link to={`/users/${post.userId}`} className="text-link">
            {authorName}
          </Link>
        </p>
      </div>
      <button
        className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
        type="button"
        onClick={() => (
          isFavorite
            ? removeFavorite(post.id)
            : addFavorite({ ...post, authorName })
        )}
        aria-pressed={isFavorite}
      >
        <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
        {isFavorite ? 'В избранном' : 'В избранное'}
      </button>
    </article>
  )
}
