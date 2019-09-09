import React from 'react'
import remark from 'remark'
import remarkBreaks from 'remark-breaks'
import remarkReact from 'remark-react'

export const MarkdownRenderer = ({
  markdown,
  components = {},
  componentOverrides,
}) => {
  const resolvedComponents = componentOverrides
    ? Object.keys(componentOverrides).reduce((acc, key) => {
        const Comp =
          components[key] || (props => React.createElement(key, props))

        acc[key] = componentOverrides[key](Comp)

        return acc
      }, components)
    : { ...components }

  return remark()
    .use(remarkReact, {
      remarkReactComponents: resolvedComponents,
    })
    .use(remarkBreaks)
    .processSync(markdown).contents
}

export default MarkdownRenderer
