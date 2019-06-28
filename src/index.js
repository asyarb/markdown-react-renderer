import remark from 'remark'
import remarkBreaks from 'remark-breaks'
import remarkReact from 'remark-react'

export const Markdown = ({ markdown, components = {} }) =>
  remark()
    .use(remarkReact, {
      remarkReactComponents: components,
    })
    .use(remarkBreaks)
    .processSync(markdown).contents
