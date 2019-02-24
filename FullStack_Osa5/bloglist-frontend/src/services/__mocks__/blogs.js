const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 13,
    user: {
      username: 'root',
      name: 'superuser',
      id: '5c6976afa5074d31d3922ad0'
    },
    id: '5a422a851b54a676234d17f7'
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 13,
    user: {
      username: 'rookie_cop',
      name: 'Leon Kennedy',
      id: '5c6976afa5074d31d3922ad0'
    },
    id: '5a422b3a1b54a676234d17f9'
  },
  {
    title: 'Type Wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 13,
    user: {
      username: 'root',
      name: 'superuser',
      id: '5c6979ec252fac35166641a9'
    },
    id: '5c7136d40c5f612198990aab'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {}

export default { getAll, setToken }
