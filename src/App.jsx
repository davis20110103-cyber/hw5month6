import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { Layout } from './components/Layout.jsx'
import { NativeRouter } from './router/RouterContext.jsx'
import { useRouter } from './router/useRouter.js'
import FavoritesPage from './pages/FavoritesPage.jsx'
import PostDetailsPage from './pages/PostDetailsPage.jsx'
import PostsPage from './pages/PostsPage.jsx'
import UserDetailsPage from './pages/UserDetailsPage.jsx'
import { useEffect } from 'react'
import './App.css'

function RouteContent() {
  const { pathname, navigate } = useRouter()
  const path = pathname.replace(/\/+$/, '') || '/'

  useEffect(() => {
    if (path === '/') {
      navigate('/posts', { replace: true })
    }
  }, [path, navigate])

  if (path === '/') {
    return null
  }

  if (path === '/posts') {
    return <PostsPage />
  }

  if (path === '/favorites') {
    return <FavoritesPage />
  }

  const postMatch = path.match(/^\/posts\/(\d+)$/)
  if (postMatch) {
    return <PostDetailsPage postId={postMatch[1]} />
  }

  const userMatch = path.match(/^\/users\/(\d+)$/)
  if (userMatch) {
    return <UserDetailsPage userId={userMatch[1]} />
  }

  return (
    <section className="panel not-found">
      <p className="eyebrow">404</p>
      <h2>Страница не найдена</h2>
      <p>Проверьте адрес или вернитесь к списку постов.</p>
    </section>
  )
}

function App() {
  return (
    <NativeRouter>
      <FavoritesProvider>
        <Layout>
          <RouteContent />
        </Layout>
      </FavoritesProvider>
    </NativeRouter>
  )
}

export default App
