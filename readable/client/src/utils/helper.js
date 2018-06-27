export function generateId() {
  return Math.random().toString(36).substr(-10)
}

export function comparePostByDate(posts) {
  const sortPosts = posts.sort((a, b) => (a.timestamp > b.timestamp))
  return sortPosts
}

export function comparePostByScore(posts) {
  const sortPosts = posts.sort((a, b) => (a.voteScore > b.voteScore))
  return sortPosts
}
