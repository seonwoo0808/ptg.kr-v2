import { Container } from '@/components/Container'

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: React.ReactNode
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight break-keep text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {/* if \n detected print next line */}
          {title.split('\\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < title.split('\\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="mt-6 text-base break-keep text-zinc-600 dark:text-zinc-400">
          {/* if \n detected print next line */}
          {intro.split('\\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < intro.split('\\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}
