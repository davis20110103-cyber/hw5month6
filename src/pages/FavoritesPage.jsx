import { useFavorites } from '../context/useFavorites.js'
import { PostCard } from '../components/PostCard.jsx'

function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()

  return (
    <section>
      <div className="page-intro favorites-heading">
        <div>
          <p className="eyebrow">ВАША ПОДБОРКА</p>
          <h1>Избранное</h1>
          <p>Сохранённые посты — всегда под рукой.</p>
        </div>
        {favorites.length > 0 && (
          <button
            className="clear-button"
            type="button"
            onClick={clearFavorites}
          >
            Очистить список
          </button>
        )}
      </div>
      {favorites.length > 0 ? (
        <div className="post-list">
          {favorites.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              authorName={post.authorName ?? `Пользователь ${post.userId}`}
            />
          ))}
        </div>
      ) : (
        <div className="empty-panel">
          <span className="empty-heart" aria-hidden="true">♡</span>
          <h2>Пока ничего нет</h2>
          <p>Добавляйте понравившиеся посты в избранное, чтобы вернуться к ним позже.</p>
        </div>
      )}
    </section>
  )
}

export default FavoritesPage
