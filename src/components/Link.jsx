import { useRouter } from '../router/useRouter.js'

export function Link({ to, children, className, ...props }) {
  const { navigate } = useRouter()

  function handleClick(event) {
    props.onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target
    ) {
      return
    }

    event.preventDefault()
    navigate(to)
  }

  return (
    <a {...props} className={className} href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
