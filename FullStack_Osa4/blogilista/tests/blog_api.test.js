const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
        ,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)

    await User.deleteMany({})
    const user = new User({ username: 'root', name: 'superuser', password: 'sekret' })
    await user.save()
})
afterAll(() => {
    mongoose.connection.close()
})

describe('check data is correct', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of blogs returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('returned blogs have a field named id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(object => {
            expect(object.id).toBeDefined()
        })

    })

})

describe('test HTTP requests for blogs', () => {

    test('can add blogs with HTTP POST request', async () => {

        const blogObject = new Blog({
            _id: "5a422bc61b54a676234d17fc",
            title: "Privacy 101",
            author: "Mark Zuckerberg",
            url: "www.facebook.com",
            likes: 5,
            __v: 0
        })

        await api.post('/api/blogs').send(blogObject).expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)
    })

    test('if likes not given set it to 0', async () => {

        const blogObject = new Blog({
            title: "CGI improves everything",
            author: "George Lucas",
            url: "www.google.com",
            likes: null,
        })

        await api.post('/api/blogs').send(blogObject).expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[6].likes).toBe(0)

    })

    test('if url or title not given return status 400', async () => {
        const blogObject = new Blog({
            title: null,
            author: "Mikko Mallikas",
            url: "www.google.com",
            likes: 0
        })
        await api.post('/api/blogs').send(blogObject).expect(400)

        const blogObject2 = new Blog({
            title: "Remember to make your app use errorHandler next time",
            author: "Mikko Mallikas",
            url: null,
            likes: 0
        })
        await api.post('/api/blogs').send(blogObject2).expect(400)

        const blogObject3 = new Blog({
            title: null,
            author: "Mikko Mallikas",
            url: null,
            likes: 0
        })
        await api.post('/api/blogs').send(blogObject3).expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(initialBlogs.length)
    })

    test('delete request actually deletes document', async () => {
        await api.delete('/api/blogs/5a422a851b54a676234d17f7').expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)
    })

    test('update request actually updates document', async () => {

        const updatedBlog = new Blog({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 10
        })

        await api.put('/api/blogs/5a422aa71b54a676234d17f8').send(updatedBlog).expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[1].likes).toBe(10)
    })
})


describe('test user creation', () => {

    test('creation works for user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = ({
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('test username and password length validation', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = ({

            username: "MikkoM",
            user: "Mikko Mallikas",
            password: "sa"
        })
        await api.post('/api/users').send(newUser).expect(400)

        const newUser2 = ({

            username: "Mi",
            user: "Mikko Mallikas",
            password: "salaisuus"
        })
        await api.post('/api/users').send(newUser2).expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

})

