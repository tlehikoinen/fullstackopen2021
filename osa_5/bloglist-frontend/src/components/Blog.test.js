import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let blogComponent
  const blog = {
    author: 'test author',
    url: 'test url',
    title: 'test title',
    likes: 0,
    user: {
      username: 'fakeUsername'
    }
  }
  const user = {
    username: 'fakeUsername',
  }
  const setNotificationMessage = () => {
    return 0
  }
  const updateBlogTable = () => {
    return 0
  }

  beforeEach(() => {
    blogComponent = render(
      <Blog blog={blog} user={user} setNotificationMessage={setNotificationMessage} updateBlogTable={updateBlogTable}/>
    )
  })

  test('Visible div is visible', () => {
    const visibleDiv = blogComponent.container.querySelector('.visibleDiv')
    expect(visibleDiv).toHaveStyle('display: block')
  })


  test('Hidden div is hidden', () => {
    const hiddenDiv = blogComponent.container.querySelector('.hiddenDiv')
    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('after clicking the button, hidden div turns to visible', () => {
    const button = blogComponent.getByText('View')
    fireEvent.click(button)

    const hiddenDiv = blogComponent.container.querySelector('.hiddenDiv')
    expect(hiddenDiv).not.toHaveStyle('display: none')
  })

})
