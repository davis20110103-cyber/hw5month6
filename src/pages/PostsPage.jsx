import { useQuery } from '@tanstack/react-query'
import { fetchPosts, fetchUsers } from '../api/jsonPlaceholder.js'
import { PostCard } from '../components/PostCard.jsx'
import { QueryState } from '../components/QueryState.jsx'

function PostsPage() {
  const postsQuery = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const isLoading = postsQuery.isLoading || usersQuery.isLoading
  const isError = postsQuery.isError || usersQuery.isError
  const error = postsQuery.error || usersQuery.error

  return (
    <section>
      <div className="page-intro">
        <p className="eyebrow">ЛЕНТА</p>
        <h1>Посты сообщества</h1>
        <p>Читайте публикации и знакомьтесь с их авторами.</p>
      </div>
      <QueryState isLoading={isLoading} isError={isError} error={error} />
      {!isLoading && !isError && (
        <div className="post-list">
          {postsQuery.data.map((post) => {
            const author = usersQuery.data.find((user) => user.id === post.userId)

            return (
              <PostCard
                key={post.id}
                post={post}
                authorName={author?.name ?? `Пользователь ${post.userId}`}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

export default PostsPage
