import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <Container className="flex h-full items-center pt-16 sm:pt-32">
        <div className="flex flex-col items-center">
          <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Page not found
          </h1>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            죄송합니다, 요청하신 페이지를 찾을 수 없습니다. URL이 잘못되었거나
            페이지가 삭제되었을 수 있습니다.
          </p>
          <Button href="/" variant="secondary" className="mt-4">
            Go back home
          </Button>
        </div>
      </Container>
    </Layout>
  )
}
