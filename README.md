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

Provide a mapping of components to Markdown. The map will take valid HTML tags
as keys.

```js
import React from 'react'
import { Markdown } from 'markdown-react-renderer'

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
  <Markdown
    markdown={markdown}
    components={{
      h1: props => <Heading color="red" {...props} />,
      h2: Subheading,
      a: Link,
    }}
  />
)
```

`<Markdown>` will render the following:

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

## API

|     Name     | Type     | Description                                                                                                  |
| :----------: | -------- | ------------------------------------------------------------------------------------------------------------ |
| `components` | `node`   | An object mapping a valid HTML element type to anything React can render (numbers, strings, elements, etc.). |
|  `markdown`  | `string` | Markdown to render.                                                                                          |

## 📝 License

Copyright © 2019 [Anthony Yarbrough](https://github.com/asyarb).<br /> This
project is
[MIT](https://github.com/asyarb/markdown-react-renderer/blob/master/LICENSE)
licensed.
