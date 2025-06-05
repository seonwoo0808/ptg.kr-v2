'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Prose } from './Prose'
import { useEffect, useState } from 'react'
import remarkGfm from 'remark-gfm'

export default function ArticleContent({ content }: { content: string }) {
  const [mdxSource, setMdxSource] = useState<
    | MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
    | undefined
  >(undefined)
  useEffect(() => {
    clientDependencyImport().then(({ serialize, rehypePrism }) => {
      serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypePrism],
        },
      }).then((source) => {
        setMdxSource(source)
      })
    })
  }, [])
  return (
    <Prose className="mt-8" data-mdx-content>
      {mdxSource ? <MDXRemote {...mdxSource} /> : <p>Loading...</p>}
    </Prose>
  )
}

const clientDependencyImport = async () => {
  const serialize = import('next-mdx-remote/serialize')
  const rehypePrismMod = await import('rehype-prism-plus')

  return {
    serialize: (await serialize).serialize,
    rehypePrism: rehypePrismMod.default || rehypePrismMod,
  }
}
