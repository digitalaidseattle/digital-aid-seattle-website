import { PortableText } from '@portabletext/react'

import components from '../../lib/portableTextComponent'

export default function InfoPage({ content }) {
  return (
    <div className="relative overflow-hidden py-16">
      <div className="relative px-6 lg:px-8">
        <article className="prose prose-lg mx-auto max-w-prose dark:prose-invert">
          <PortableText value={content.content} components={components} />
        </article>
      </div>
    </div>
  )
}
