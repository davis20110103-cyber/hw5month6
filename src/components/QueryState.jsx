export function QueryState({ isLoading, isError, error }) {
  if (isLoading) {
    return (
      <div className="query-state" role="status">
        <span className="spinner" aria-hidden="true" />
        Загружаем данные...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="query-state error-message" role="alert">
        Не удалось загрузить данные: {error.message}
      </div>
    )
  }

  return null
}
