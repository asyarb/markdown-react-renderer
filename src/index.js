import React, { useMemo } from 'react'
import remark from 'remark'
import remarkReact from 'remark-react'
import remarkBreaks from 'remark-breaks'

export const MarkdownRenderer = ({
  markdown,
  components = {},
  componentOverrides = {},
  breaks = true,
}) => {
  const resolvedComponents = useMemo(
    () =>
      Object.keys(componentOverrides).reduce(
        (acc, key) => {
          const Comp =
            components[key] || (props => React.createElement(key, props))

          acc[key] = componentOverrides[key](Comp)

          return acc
        },
        { ...components }
      ),
    [components, componentOverrides]
  )

  const instance = useMemo(() => {
    const r = remark().use(remarkReact, {
      remarkReactComponents: resolvedComponents,
    })

    if (breaks) r.use(remarkBreaks)

    return r
  }, [breaks, resolvedComponents])

  return useMemo(() => instance.processSync(markdown).contents, [
    instance,
    markdown,
  ])
}

export default MarkdownRenderer
