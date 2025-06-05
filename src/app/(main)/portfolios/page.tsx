import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import LinkIcon from '@/components/icons/Link'
import { formatStringDate } from '@/lib/formatDate'
import { TrophyIcon } from '@/components/icons/Trophy'
import { awards, certificates, projects } from './portfolioLog'

export const metadata: Metadata = {
  title: 'Portfolios',
  description: '제가 세상에 남긴 프로젝트, 수상이력, 자격증들을 소개합니다.',
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex w-full justify-center">
        <div className="flex w-full items-center">
          <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700" />
          <span className="mx-4 text-lg font-semibold text-zinc-700 dark:text-zinc-200">
            {title}
          </span>
          <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700" />
        </div>
      </div>
      {children}
    </section>
  )
}

export default function Projects() {
  return (
    <SimpleLayout
      title="What I have built."
      intro="제가 세상에 남긴 프로젝트, 수상이력, 자격증들을 소개합니다. 앞으로도 더 많은 프로젝트를 추가할 예정입니다."
    >
      <Section title="Projects">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-8 w-8"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </Section>
      <Section title="Awards">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {awards.map((award) => (
              <div
                key={award.title}
                className="md:grid md:grid-cols-4 md:items-baseline"
              >
                <Card className="md:col-span-3">
                  <Card.Title>{award.title}</Card.Title>

                  <div className="flex items-center space-x-2">
                    <Card.Tag>
                      <TrophyIcon
                        className={'mr-2 w-3 ' + gradeToColor(award.grade)}
                      />
                      {award.grade}
                    </Card.Tag>
                    {award.tag.map((tag) => (
                      <Card.Tag key={tag}>{tag}</Card.Tag>
                    ))}
                  </div>

                  <Card.Eyebrow
                    as="time"
                    dateTime={award.date}
                    className="md:hidden"
                    decorate
                  >
                    {formatStringDate(award.date)}
                  </Card.Eyebrow>
                  <Card.Description>{award.description}</Card.Description>
                </Card>
                <Card.Eyebrow
                  as="time"
                  dateTime={award.date}
                  className="mt-1 max-md:hidden"
                >
                  {formatStringDate(award.date)}
                </Card.Eyebrow>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section title="Certificates">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {certificates.map((certificate) => (
              <div
                key={certificate.title}
                className="md:grid md:grid-cols-4 md:items-baseline"
              >
                <Card className="md:col-span-3">
                  <Card.Title>{certificate.title}</Card.Title>

                  <div className="flex items-center space-x-2">
                    {certificate.tag.map((tag) => (
                      <Card.Tag key={tag}>{tag}</Card.Tag>
                    ))}
                  </div>

                  <Card.Eyebrow
                    as="time"
                    dateTime={certificate.date}
                    className="md:hidden"
                    decorate
                  >
                    {formatStringDate(certificate.date)}
                  </Card.Eyebrow>
                  <Card.Description>{certificate.description}</Card.Description>
                </Card>
                <Card.Eyebrow
                  as="time"
                  dateTime={certificate.date}
                  className="mt-1 max-md:hidden"
                >
                  {formatStringDate(certificate.date)}
                </Card.Eyebrow>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SimpleLayout>
  )
}

function gradeToColor(grade: string) {
  if (grade.startsWith('대상')) {
    return 'text-teal-500 dark:text-teal-400' // Platinum
  }
  if (grade.startsWith('금상') || grade.startsWith('최우수상')) {
    return 'text-yellow-500 dark:text-yellow-400' // Gold
  }
  if (grade.startsWith('은상') || grade.startsWith('우수상')) {
    return 'text-gray-400 dark:text-gray-300' // Silver
  }
  if (grade.startsWith('동상') || grade.startsWith('장려상')) {
    return 'text-amber-600 dark:text-amber-700' // Bronze
  }
  return 'text-zinc-500 dark:text-zinc-400' // Default color for unknown grades
}
