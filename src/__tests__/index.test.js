/* eslint-disable no-unused-vars */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'

import { Markdown } from '../index'

afterEach(cleanup)

describe('Markdown', () => {
  const markdown = `
  # React
  ## A JavaScript library for interfaces.
  [Get started](https://reactjs.org/docs/getting-started.html)
  `

  const Heading = () => <h4>HEADING</h4>
  const Subheading = () => <h6>SUBHEADING</h6>
  const Link = () => <a href="https://google.com">LINK</a>

  test('renders null if no markdown is provided', () => {
    const { container } = render(<Markdown />)

    expect(container.firstChild).toBeNull()
  })

  test('renders plain HTML if no components are provided', () => {
    const { container, getByText } = render(<Markdown markdown={markdown} />)

    const heading1 = container.querySelector('h1')
    const heading2 = container.querySelector('h2')
    const p = container.querySelector('p')
    const a = container.querySelector('a')

    expect(getByText('React')).toBeInTheDocument()
    expect(
      getByText('A JavaScript library for interfaces.')
    ).toBeInTheDocument()
    expect(getByText('Get started')).toBeInTheDocument()

    expect(container).toContainElement(heading1)
    expect(container).toContainElement(heading2)
    expect(container).toContainElement(p)
    expect(container).toContainElement(a)
  })

  test('renders React components from the provided map', () => {
    const { container, getByText } = render(
      <Markdown
        markdown={markdown}
        components={{
          h1: props => <Heading {...props} />,
          h2: props => <Subheading {...props} />,
          a: props => <Link {...props} />,
        }}
      />
    )

    const heading4 = container.querySelector('h4')
    const heading6 = container.querySelector('h6')
    const p = container.querySelector('p')
    const a = container.querySelector('a')

    expect(getByText('HEADING')).toBeInTheDocument()
    expect(getByText('SUBHEADING')).toBeInTheDocument()
    expect(getByText('LINK')).toBeInTheDocument()

    expect(container).toContainElement(heading4)
    expect(container).toContainElement(heading6)
    expect(container).toContainElement(p)
    expect(container).toContainElement(a)
  })
})
