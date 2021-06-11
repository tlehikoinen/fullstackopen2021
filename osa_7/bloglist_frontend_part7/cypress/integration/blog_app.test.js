
const user = {
  name: 'Test User',
  username: 'testuser',
  password: 'password'
}

describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page opens with login form', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.errorNotification').should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login( { username : 'testuser', password : 'password' })
    })

    it('A Blog can be created', function() {
      cy.contains('Create').click()
      cy.get('#newBlogTitle').type('Test Blog Title')
      cy.get('#newBlogAuthor').type('Test Blog Author')
      cy.get('#newBlogUrl').type('Test Blog Url')
      cy.get('#submitNewBlog-button').click()
      cy.contains('Test Blog Title by Test Blog Author was successfully added')
      cy.request('GET', 'http://localhost:3003/api/blogs')
        .then(response => {
          expect(response.body.length).to.eq(1)})
    })
    it('A blog can not be created without url', function () {
      cy.contains('Create').click()
      cy.get('#newBlogTitle').type('Test Blog Title')
      cy.get('#newBlogAuthor').type('Test Blog Author')
      cy.get('#submitNewBlog-button').click()
      cy.contains('Blog validation fail')
    })

    describe('and when blog exists', function () {
      const blog = { title: 'test title', author: 'test author', url: 'test url' }

      beforeEach(function() {
        cy.createBlog( blog )
      })

      it('User can add like to blog', function() {
        cy.contains('test title')
        cy.contains('View').click()
        cy.contains('Likes: 0')
        cy.get('#like-button').click()
        cy.contains('Likes: 1')
      })

      it('User can delete the blog', function() {
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.contains('Deleted Successfully')
        cy.request('GET', 'http://localhost:3003/api/blogs')
          .then(response => {
            expect(response.body.length).to.eq(0)})
      })

    })

    describe('and when multiple blogs exist', function() {
      const blog1 = { title: 'test title', author: 'test author', url: 'test url', likes: 5 }
      const blog2 = { title: 'test title', author: 'test author', url: 'test url', likes: 1 }
      const blog3 = { title: 'test title', author: 'test author', url: 'test url', likes: 10 }

      beforeEach(function() {
        cy.createBlog(blog1)
        cy.createBlog(blog2)
        cy.createBlog(blog3)
      })

      it('Blogs are sorted by likes', function() {
        cy.get('.visibleDiv').then(elements => {
          for(let i = 0; i<3; i++) {
            cy.get(elements[i]).contains('View').click()
          }
        })

        cy.get('.blogDiv').then(blogs => {
          cy.get(blogs[0]).contains('Likes: 10')
          cy.get(blogs[1]).contains('Likes: 5')
          cy.get(blogs[2]).contains('Likes: 1')
        })

      })
    })

  })

})