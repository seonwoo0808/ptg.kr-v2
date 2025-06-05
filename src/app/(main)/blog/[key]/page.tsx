export const runtime = 'edge'

import { Container } from '@/components/Container'
import { parseKey } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import Link from 'next/link'
import ArrowLeftIcon from '@/components/icons/ArrowLeft'
import ArticleContent from '@/components/ArticleContent'
import Giscus from '@/app/atom/blog-key/Giscuss'

type PageParams = Promise<{ key: string }>

export async function generateMetadata({ params }: { params: PageParams }) {
  const { key } = await params
  const keyDecoded = decodeURIComponent(key)
  const metadata = parseKey(keyDecoded)
  if (!metadata) {
    return {
      title: 'Article not found',
      description: 'The requested article could not be found.',
    }
  }
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://ptg.kr/blog/${key}`,
      type: 'article',
      publishedTime: metadata.createdDate.toISOString(),
    },
  }
}

export default async function RemoteMdxPage({
  params,
}: {
  params: PageParams
}) {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const { key } = await params
  const keyDecoded = decodeURIComponent(key)

  const markdown = await fetch('https://blog-r2.ptg.kr/' + keyDecoded).then(
    async (response) => {
      if (response.status === 404) {
        return null
      }
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.text()
    },
  )
  const metadata = parseKey(keyDecoded)
  if (!metadata || !markdown) {
    return (
      <Container className="mt-16 lg:mt-32">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Article not found
          </h1>
        </div>
      </Container>
    )
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            type="button"
            aria-label="Go back to articles"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </Link>
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {metadata.title}
              </h1>
              <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                {metadata.description}
              </p>
              <time
                dateTime={metadata.createdDate.toISOString()}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(metadata.createdDate)}</span>
              </time>
            </header>
            <ArticleContent content={markdown} />
          </article>
        </div>
        <hr className="mt-24 mb-18 border-zinc-200 dark:border-zinc-700" />
        <div className="flex items-center justify-center gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            이 글은 CC BY-NC-SA 4.0 라이선스에 따라 배포됩니다.
          </p>

          <Link
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-teal-800 dark:text-zinc-400 dark:hover:text-teal-400"
          >
            라이선스 전문 보기
          </Link>
        </div>
        <hr className="my-18 border-zinc-200 dark:border-zinc-700" />
        <Giscus />
      </div>
    </Container>
  )
}
