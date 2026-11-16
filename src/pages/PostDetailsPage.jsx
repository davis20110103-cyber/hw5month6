import { useQuery } from '@tanstack/react-query'
import { fetchPost, fetchUser } from '../api/jsonPlaceholder.js'
import { PostCard } from '../components/PostCard.jsx'
import { QueryState } from '../components/QueryState.jsx'
import { Link } from '../components/Link.jsx'

function PostDetailsPage({ postId }) {
  const postQuery = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => fetchPost(postId),
  })
  const userId = postQuery.data?.userId
  const userQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    enabled: Boolean(userId),
  })

  if (postQuery.isLoading || postQuery.isError) {
    return (
      <section>
        <QueryState
          isLoading={postQuery.isLoading}
          isError={postQuery.isError}
          error={postQuery.error}
        />
      </section>
    )
  }

  const post = postQuery.data

  return (
    <article className="detail-panel">
      <Link to="/posts" className="back-link">← Все посты</Link>
      <p className="eyebrow detail-kicker">ПОСТ №{String(post.id).padStart(2, '0')}</p>
      <h1 className="detail-title">{post.title}</h1>
      {userQuery.isLoading || userQuery.isError ? (
        <QueryState
          isLoading={userQuery.isLoading}
          isError={userQuery.isError}
          error={userQuery.error}
        />
      ) : (
        <p className="detail-author">
          Автор:{' '}
          <Link to={`/users/${post.userId}`} className="text-link">
            {userQuery.data.name}
          </Link>
        </p>
      )}
      <div className="post-body">{post.body}</div>
      <div className="detail-action">
        <PostCard
          post={post}
          authorName={userQuery.data?.name ?? `Пользователь ${post.userId}`}
        />
      </div>
    </article>
  )
}

export default PostDetailsPage
