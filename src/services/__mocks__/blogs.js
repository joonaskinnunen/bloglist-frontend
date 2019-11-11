const blogs = [
  {
    title: 'Life in Duckburg',
    author: 'Donald Duck',
    url: 'http://blogsaddress.com',
    likes: 4,
    user: {
      _id: '6b437a9e514ab7f168ddf139',
      username: 'joonaskinnunen',
      name: 'Joonas Kinnunen'
    },
    id: '8b437a9e444ab7f168ddf343'
  },
  {
    title: 'Some blog',
    author: 'Winnie the Pooh',
    url: 'http://blogsaddress.com',
    likes: 4,
    user: {
      _id: '6b437a9e514ab7f168ddf140',
      username: 'joeaverage',
      name: 'Joe Average'
    },
    id: '6b437a9e514ab7f168ddf139'
  },
  {
    title: 'Some other blog',
    author: 'Donald Duck',
    url: 'http://blogsaddress.com',
    likes: 4,
    user: {
      _id: '6b437a9e514ab7f168ddf141',
      username: 'joonaskinnunen',
      name: 'Joonas Kinnunen'
    },
    id: '7f168ddf114ab7f168ddf166'
  }
]
const setToken = newToken => {
  console.log(newToken)
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }