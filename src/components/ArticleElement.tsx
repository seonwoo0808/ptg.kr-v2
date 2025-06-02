import { ArticleMeta } from "@/lib/articles";
import { Card } from "./Card";
import { formatDate } from "@/lib/formatDate";

export default function ArticleElement({ articleMeta }: { articleMeta: ArticleMeta }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${encodeURIComponent(articleMeta.key)}`}>{articleMeta.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={articleMeta.createdDate.toDateString()}
          className="md:hidden"
          decorate
        >
          {formatDate(articleMeta.createdDate)}
        </Card.Eyebrow>
        <Card.Description>{articleMeta.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={articleMeta.createdDate.toDateString()}
        className="mt-1 max-md:hidden"
      >
        {formatDate(articleMeta.createdDate)}
      </Card.Eyebrow>
    </article>
  )
}

