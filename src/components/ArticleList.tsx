'use client'

import { useEffect, useState } from 'react'
import { ArticleMeta, parseObjectToArticleMeta } from '@/lib/articles'
import { R2Object } from '@/lib/r2'
import ArticleElement from './ArticleElement'
import { motion } from 'framer-motion'

export default function ArticleList({ limit }: { limit?: number }) {
  const [articleMetas, setArticleMetas] = useState<ArticleMeta[]>([])
  const [ready, setReady] = useState(false)
  useEffect(() => {
    fetch('/postmeta')
      .then((res) => res.json())
      .then((data) => {
        const articles: ArticleMeta[] = []
        data.forEach((element: R2Object) => {
          const article = parseObjectToArticleMeta(element)
          if (article) {
            articles.push(article)
          }
        })
        const sortedArticles = articles.sort(
          (a, z) => +new Date(z.createdDate) - +new Date(a.createdDate),
        )
        setArticleMetas(limit ? sortedArticles.slice(0, limit) : sortedArticles)
        setReady(true)
      })
  }, [limit])

  return ready ? (
    articleMetas.length > 0 ? (
      <motion.div
        className="flex flex-col gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      >
        {articleMetas.map((articleMeta, index) => (
          <motion.div
            key={articleMeta.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <ArticleElement articleMeta={articleMeta} />
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <div className="flex h-20 items-center justify-center text-zinc-500 dark:text-zinc-400">
        No articles found.
      </div>
    )
  ) : (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {Array.from({ length: limit ?? 5 }).map((_, index) => (
        <motion.div
          key={index}
          className="h-20 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </motion.div>
  )
}
