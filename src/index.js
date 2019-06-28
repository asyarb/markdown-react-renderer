import remark from 'remark'
import remarkBreaks from 'remark-breaks'
import remarkReact from 'remark-react'

export const Markdown = ({ markdown, map = {} }) =>
  remark()
    .use(remarkReact, {
      remarkReactComponents: map,
    })
    .use(remarkBreaks)
    .processSync(markdown).contents
