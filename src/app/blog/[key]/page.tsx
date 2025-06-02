export const runtime = 'edge';

import { Container } from '@/components/Container'
import { parseKey } from '@/lib/articles';
import { formatDate } from '@/lib/formatDate';
import Link from 'next/link';
import ArrowLeftIcon from '@/components/icons/ArrowLeft';
import ArticleContent from '@/components/ArticleContent';


type PageParams = Promise<{ key : string }>;

export default async function RemoteMdxPage({ params }: {params : PageParams}) {
    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const { key } = await params
    const keyDecoded = decodeURIComponent(key)
    const markdown = await fetch('https://blog-r2.ptg.kr/' + keyDecoded).then(async (response) => {
        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
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
              {/* )} */}
              <article>
                <header className="flex flex-col">
                  <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                    {metadata.title}
                  </h1>
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
          </div>
    </Container>
    ) 
}
  
  