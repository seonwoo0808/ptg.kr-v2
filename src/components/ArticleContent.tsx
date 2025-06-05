'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Prose } from './Prose'
import { useEffect, useState } from 'react'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'

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
    console.log('MDX content loaded')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Prose className="mt-8" data-mdx-content>
      {mdxSource ? (
        <MDXRemote {...mdxSource} />
      ) : (
        // circular loading indicator
        <motion.div
          className="flex h-64 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-zinc-200 dark:border-zinc-700"></div>
        </motion.div>
      )}
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
