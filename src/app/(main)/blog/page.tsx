import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticleMetas } from '@/lib/articles'
import handler from '@/lib/r2'
import ArticleElement from '@/components/ArticleElement'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stories and insights on developing, student activity and business.',
}

export default async function ArticlesIndex() {
  let articleMetas = await getAllArticleMetas()

  handler()

  return (
    <SimpleLayout
      title="Stories and Insights on Developing, Student Activity and Business."
      intro="블로그에서는 개발,
            학교생활, 그리고 경영에 대한 제 생각과 경험을 공유하고 있습니다."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articleMetas.map((articleMeta) => (
            <ArticleElement key={articleMeta.key} articleMeta={articleMeta} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
