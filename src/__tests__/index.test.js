/* eslint-disable no-unused-vars */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { MarkdownRenderer } from '../index'

afterEach(cleanup)

describe('Markdown', () => {
  const markdown = `
  # React
  ## A JavaScript library for interfaces.
  [Get started](https://reactjs.org/docs/getting-started.html)
  `

  const Heading = props => <h4 {...props}>HEADING</h4>
  const Subheading = props => <h6 {...props}>SUBHEADING</h6>
  const Link = props => (
    <a href="https://google.com" style={{ color: 'red' }} {...props}>
      LINK
    </a>
  )

  it('renders null if no markdown is provided', () => {
    const { container } = render(<MarkdownRenderer />)

    expect(container.firstChild).toBeNull()
  })

  it('renders plain HTML if no components are provided', () => {
    const { container, getByText } = render(
      <MarkdownRenderer markdown={markdown} />
    )

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

  it('renders React components from the provided map', () => {
    const { container, getByText } = render(
      <MarkdownRenderer
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

  it('handles merging component overrides', () => {
    const { container, getByText } = render(
      <MarkdownRenderer
        markdown={markdown}
        components={{
          h1: props => <Heading {...props} />,
          a: props => <Link {...props} />,
        }}
        componentOverrides={{
          h2: Comp => props => <Comp {...props}>OVERRIDES</Comp>,
          a: Comp => props => <Comp {...props} href="https://example.com/" />,
        }}
      />
    )

    const h2 = container.querySelector('h2')
    const a = container.querySelector('a')

    expect(getByText('HEADING')).toBeInTheDocument()
    expect(getByText('OVERRIDES')).toBeInTheDocument()
    expect(container).toContainElement(h2)
    expect(container).toContainElement(a)
    expect(a).toHaveStyle('color: red')
    expect(a.href).toBe('https://example.com/')
  })
})
