const dummy = (blogs) => {
    const one = 1
    return one
}

const totalLikes = (blogs) => {

    const likes = blogs.map(blog => blog.likes)
    const sum = likes.reduce((a, b) => a + b, 0)

    return sum
}

const favoriteBlog = (blogs) => {

    const mostLikes = blogs.reduce((prev, curr) =>
        prev.likes > curr.likes ? prev : curr)

    return mostLikes
}

const mostBlogs = (blogList) => {

    const names = blogList.map(blog => blog.author)

    if (names.length === 0) return null

    var blogCounter = {}
    var maxName = names[0], maxBlogs = 1

    for (var i = 0; i < names.length; i++) {
        var name = names[i]

        if (blogCounter[name] == null) {
            blogCounter[name] = 1
        } else {
            blogCounter[name]++
        }

        if (blogCounter[name] > maxBlogs) {
            maxName = name
            maxBlogs = blogCounter[name]
        }
    }

    return { author: maxName, blogs: maxBlogs }
}

const mostLikes = (blogs) => {

    const names = blogs.map(blog => blog.author)

    if (names.length === 0) return null

    var likeCounter = {}
    var maxName = names[0], maxLikes = 1

    for (var i = 0; i < blogs.length; i++) {
        var name = names[i]

        if (likeCounter[name] == null) {
            likeCounter[name] = blogs[i].likes
        } else {
            likeCounter[name] += blogs[i].likes
        }

        if (likeCounter[name] > maxLikes) {
            maxName = name
            maxLikes = likeCounter[name]
        }
    }

    return { author: maxName, likes: maxLikes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}