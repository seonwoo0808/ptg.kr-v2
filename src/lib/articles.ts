import R2List, { R2Object } from "./r2"

export interface ArticleMeta {
  title: string
  description: string
  key: string
  slug: string
  author: string
  createdDate: Date
  modifiedDate: Date
}

// async function importArticle(
//   articleFilename: string,
// ): Promise<ArticleWithSlug> {
//   let { article } = (await import(`../app/blog/${articleFilename}`)) as {
//     default: React.ComponentType
//     article: Article
//   }

//   return {
//     slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
//     ...article,
//   }
// }

export async function getAllArticleMetas() {
  // let articleFilenames = await glob('*/page.mdx', {
  //   cwd: './src/app/blog-markdown',
  // })

  let articleObjs = await R2List()
  let articles: ArticleMeta[] = []

  for (const articleObj of articleObjs) {
    const result = parseObjectToArticleMeta(articleObj)

    if (!result) continue
    articles.push(result)
  }

  return articles.sort((a, z) => +new Date(z.createdDate) - +new Date(a.createdDate))
}

export const parseObjectToArticleMeta = (obj: R2Object): ArticleMeta | undefined => {
  const slugSegment = obj.Key.split('/')
    const segment = slugSegment.pop()?.replace(".mdx", "").split('|')
    if (!segment) return undefined
    const slug = slugSegment.join('/')
  if (segment.length <= 2) return undefined
  return {
    title: segment[0],
    description: segment[1],
    key: obj.Key,
    slug: slug,
    author : "Seonwoo Jeong",
    createdDate: new Date(segment[2]),
    modifiedDate: obj.LastModified,
  }

}

export const parseKey = (key: string): ArticleMeta | undefined => {
  const slugSegment = key.split('/')
  const segment = slugSegment.pop()?.replace(".mdx", "").split('|')
  if (!segment) return undefined
  const slug = slugSegment.join('/')
  if (segment.length <= 2) return undefined
  return {
    title: segment[0],
    description: segment[1],
    key: key,
    slug: slug,
    author : "Seonwoo Jeong",
    createdDate: new Date(segment[2]),
    modifiedDate: new Date(),
  }
}