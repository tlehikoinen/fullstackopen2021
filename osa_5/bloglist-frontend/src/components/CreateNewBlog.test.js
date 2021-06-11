import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateNewBlog from './CreateNewBlog'

describe('testing create new form', () => {
  let createNewComponent
  const createNewBlog = jest.fn()

  beforeEach(() => {
    createNewComponent = render(
      <CreateNewBlog createNewVisible={true} createNewBlog={createNewBlog} />
    )
  })

  test('Form is not hidden ', () => {
    const createNewDiv = createNewComponent.container.querySelector('.createNew')
    expect(createNewDiv).toHaveStyle('display: block')
  })

  test('On submit CreateNewBlog-form calls createNewBlog() with correct info', () => {
    const author = createNewComponent.container.querySelector('#newBlogAuthor')
    const title = createNewComponent.container.querySelector('#newBlogTitle')
    const url = createNewComponent.container.querySelector('#newBlogUrl')
    const form = createNewComponent.container.querySelector('.newForm')

    fireEvent.change(author, {
      target: { value: 'Testing with Test Author' }
    })
    fireEvent.change(title, {
      target: { value: 'Testing with Test Title' }
    })
    fireEvent.change(url, {
      target: { value: 'Testing with Test Url' }
    })
    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].author).toBe('Testing with Test Author')
    expect(createNewBlog.mock.calls[0][0].title).toBe('Testing with Test Title')
    expect(createNewBlog.mock.calls[0][0].url).toBe('Testing with Test Url')

  })

})
