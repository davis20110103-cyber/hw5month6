import { useQuery } from '@tanstack/react-query'
import { fetchUser, fetchUserPosts } from '../api/jsonPlaceholder.js'
import { PostCard } from '../components/PostCard.jsx'
import { QueryState } from '../components/QueryState.jsx'

function UserDetailsPage({ userId }) {
  const userQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
  })
  const postsQuery = useQuery({
    queryKey: ['posts', 'by-user', userId],
    queryFn: () => fetchUserPosts(userId),
  })
  const isLoading = userQuery.isLoading || postsQuery.isLoading
  const isError = userQuery.isError || postsQuery.isError
  const error = userQuery.error || postsQuery.error

  return (
    <section>
      <QueryState isLoading={isLoading} isError={isError} error={error} />
      {!isLoading && !isError && (
        <>
          <div className="profile-panel">
            <p className="eyebrow">АВТОР</p>
            <h1>{userQuery.data.name}</h1>
            <dl className="profile-details">
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${userQuery.data.email}`}>{userQuery.data.email}</a></dd>
              </div>
              <div>
                <dt>Город</dt>
                <dd>{userQuery.data.address.city}</dd>
              </div>
            </dl>
          </div>
          <div className="page-intro user-posts-heading">
            <p className="eyebrow">АВТОРСКАЯ ЛЕНТА</p>
            <h2>Посты автора</h2>
          </div>
          {postsQuery.data.length > 0 ? (
            <div className="post-list">
              {postsQuery.data.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  authorName={userQuery.data.name}
                />
              ))}
            </div>
          ) : (
            <p className="empty-state">У этого автора пока нет постов.</p>
          )}
        </>
      )}
    </section>
  )
}

export default UserDetailsPage
