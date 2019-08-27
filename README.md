<h1 align="center">markdown-react-renderer</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/asyarb/markdown-react-renderer/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> React component for rendering Markdown strings to components.

## Install

```sh
yarn add markdown-react-renderer
```

## Usage

Provide a map of components to Markdown. The map will take valid HTML tags as
keys.

```js
import React from 'react'
import { MarkdownRenderer } from 'markdown-react-renderer'

// Components to which elements are mapped
import Heading from './Heading'
import Subheading from './Subheading'
import Link from './Link'

// Markdown to render as React components
const markdown = `
  # React
  ## A JavaScript library for building user interfaces.
  [Get started](https://reactjs.org/docs/getting-started.html)
`

const App = () => (
  <MarkdownRenderer
    markdown={markdown}
    components={{
      h1: props => <Heading color="red" {...props} />,
      h2: Subheading,
      a: Link,
    }}
  />
)
```

`<MarkdownRenderer>` will render the following:

```js
<>
  <Heading color="red">React</Heading>
  <Subheading>A JavaScript library for building user interfaces.</Subheading>
  <p>
    <Link href="https://reactjs.org/docs/getting-started.html">
      Get started
    </Link>
  </p>
</>
```

## Component overrides

`MarkdownRenderer` supports overriding components provided in the `components`
prop as needed. This can be utilized to create a reusable `MarkdownRenderer`
with a default set of components throughout your project.

```jsx
// src/components/Markdown.js

import { Heading, Subheading, Link } from 'src/components'

export const Markdown = props => (
  <MarkdownRenderer
    components={{
      h1: props => <Heading color="red" {...props} />,
    }}
    {...props}
  />
)
```

The `Markdown` component could be used by passing it a Markdown string.

```js
// src/pages/index.js

import { Markdown } from 'src/components'

export const IndexPage = ({ markdown }) => <Markdown markdown={markdown} />
```

This will render `H1` elements with **red text**.

If individual components need to be overridden, you can provide a mapping using
the `componentOverrides` prop.

```js
// src/pages/index.js

import { Markdown } from 'src/components'

export const IndexPage = ({ markdown }) => (
  <Markdown
    markdown={markdown}
    componentOverrides={{
      h1: Comp => props => <Comp {...props} color="blue" />,
    }}
  />
)
```

This will render `H1` elements with **blue text**.

Note that `Comp` is the `Heading` component defined in the original `components`
prop. This allows you to keep the existing component and modify it as needed.
Alternatively, you could disregard `Comp` and return a completely different
component.

## Props

| Name                 | Type     | Description                                                                                                                                  |
| -------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `markdown`           | `string` | Markdown to render.                                                                                                                          |
| `components`         | `node`   | An object mapping a valid HTML element type to anything React can render (numbers, strings, elements, etc.).                                 |
| `componentOverrides` | `node`   | An object mapping an HTML element type to a function that returns another React can render. See [Component overrides](#component-overrides). |

## Similar packages

- [react-html-renderer][react-html-renderer]

[react-html-renderer]: https://github.com/angeloashmore/react-html-renderer

## 📝 License

This project is
[MIT](https://github.com/asyarb/markdown-react-renderer/blob/master/LICENSE)
licensed.
