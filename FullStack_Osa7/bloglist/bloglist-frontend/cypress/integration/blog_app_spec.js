describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('log in to application')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username')
        .type('mluukkai')
      cy.get('#password')
        .type('salainen')
      cy.contains('login')
        .click()
    })

    it('name of the user is shown', function () {
      cy.contains('Matti Luukkainen logged in')
    })
    it('can log out', function () {
      cy.contains('logout').click()
      cy.contains('log in to application')
    })

    it('lists all users', function () {
      cy.contains('users').click()
      cy.contains('list of users')
    })

    it('can get user added blogs', function () {
      cy.contains('new blog')
        .click()
      cy.contains('users').click()
      cy.get(':nth-child(1) > a').click()
      cy.contains('added blogs')
    })

    it('a new blog can be created', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Full Stack kurssi')
      cy.get('#author')
        .type('Matti Luukkainen')
      cy.get('#url')
        .type('helsinki.fi')
      cy.contains('create')
        .click()
      cy.contains('Full Stack kurssi')
    })
  })
  describe('after blog is added', function () {
    beforeEach(function () {
      cy.get('#username')
        .type('mluukkai')
      cy.get('#password')
        .type('salainen')
      cy.contains('login')
        .click()
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Full Stack kurssi')
      cy.get('#author')
        .type('Matti Luukkainen')
      cy.get('#url')
        .type('helsinki.fi')
      cy.contains('create')
        .click()
      cy.contains('Full Stack kurssi')
        .click()
    })
    it('can get information of blog', function () {
      cy.contains('helsinki.fi')
    })
    it('can like a blog', function () {
      cy.contains('likes: 0')
      cy.contains('like').click()
      cy.contains('likes: 1')
    })
    it('can comment a blog', function () {
      cy.get('#comment').type('test comment')
      cy.contains('add comment').click()
      cy.contains('test comment')
    })
    it('can delete blog', function () {
      cy.contains('Full Stack kurssi').click()
      cy.contains('delete').click()
      cy.contains('Full Stack kurssi').should('not.exist')
    })
  })
})