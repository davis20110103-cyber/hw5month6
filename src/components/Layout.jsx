import { PageHeader } from './PageHeader.jsx'

export function Layout({ children }) {
  return (
    <main className="app-shell">
      <PageHeader />
      <div className="page-content">{children}</div>
      <footer className="page-footer">
        Посты и авторы · JSONPlaceholder
      </footer>
    </main>
  )
}
