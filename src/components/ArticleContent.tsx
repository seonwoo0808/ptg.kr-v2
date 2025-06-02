'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { Prose } from "./Prose"
import { useEffect, useState } from "react"
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

export default function ArticleContent({ content }: { content: string }) {
    const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>> | undefined>(undefined)
    useEffect(() => {
        serialize(content,
            {
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypePrism],
                },
            }
        ).then((source) => {
            setMdxSource(source)
        })
    }, [])
    return <Prose className="mt-8" data-mdx-content>
        {mdxSource ? <MDXRemote {...mdxSource} /> : <p>Loading...</p>}
        </Prose>
}