'use client'

import { useEffect, useState } from 'react'
import { ArticleMeta, parseObjectToArticleMeta } from '@/lib/articles'
import { R2Object } from '@/lib/r2'
import ArticleElement from './ArticleElement'

export default function ArticleList() {
  const [articleMetas, setArticleMetas] = useState<ArticleMeta[]>([])
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
        setArticleMetas(
          articles.sort(
            // sort by createdDate descending
            (a, z) => +new Date(z.createdDate) - +new Date(a.createdDate),
          ),
        )
      })
  }, [])

  return articleMetas.map((articleMeta) => (
    <ArticleElement key={articleMeta.key} articleMeta={articleMeta} />
  ))
}
