const API_URL = 'https://jsonplaceholder.typicode.com'

async function requestJson(path) {
  const response = await fetch(`${API_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Ошибка запроса (${response.status})`)
  }

  return response.json()
}

export function fetchPosts() {
  return requestJson('/posts')
}

export function fetchPost(postId) {
  return requestJson(`/posts/${postId}`)
}

export function fetchUser(userId) {
  return requestJson(`/users/${userId}`)
}

export function fetchUserPosts(userId) {
  return requestJson(`/posts?userId=${encodeURIComponent(userId)}`)
}

export function fetchUsers() {
  return requestJson('/users')
}
