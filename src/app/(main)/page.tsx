import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/icons/SocialIcons'
import logoClast from '@/images/logos/clast-corp.svg'
import logoDimiHigh from '@/images/logos/dimi-high.svg'
import logoFlexIT from '@/images/logos/flex-corp.svg'
import logoInhaUniv from '@/images/logos/inha-univ.svg'
import image1 from '@/images/photos/image-1.webp'
import image2 from '@/images/photos/image-2.webp'
import image3 from '@/images/photos/image-3.webp'
import image4 from '@/images/photos/image-4.webp'
import image5 from '@/images/photos/image-5.webp'
import { getAllArticleMetas } from '@/lib/articles'
import MailIcon from '@/components/icons/Mail'
import BriefcaseIcon from '@/components/icons/Briefcase'
import ArrowDownIcon from '@/components/icons/ArrowDown'
import ArticleElement from '@/components/ArticleElement'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props} target="_blank">
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none fill-zinc-400 dark:fill-zinc-500" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm break-keep text-zinc-600 dark:text-zinc-400">
        뉴스레터를 구독해서 새로운 글이나 IT 관련 소식을 받아보세요. 구독은
        무료이며 언제든지 취소할 수 있습니다.
      </p>
      <div className="mt-6 flex items-center">
        <span className="flex min-w-0 flex-auto p-px">
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            required
            className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
          />
        </span>
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'FLEX IT Inc.',
      title: 'Project Manager',
      logo: logoFlexIT,
      start: '2025',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Clast',
      title: 'Back-End Developer(Freelance)',
      logo: logoClast,
      start: '2020',
      end: '2024',
    },
    {
      company: 'Inha University',
      title: 'Business Administration',
      logo: logoInhaUniv,
      start: '2025',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Korea Digital Media High School',
      title: 'Web Prgramming(AI Course)',
      logo: logoDimiHigh,
      start: '2021',
      end: '2024',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work & Academic</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  let articleMetas = (await getAllArticleMetas()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Back-End Developer, Student, and Junior Entrepreneur.
          </h1>
          <p className="mt-6 text-base break-keep text-zinc-600 dark:text-zinc-400">
            안녕하세요! 저는 백엔드 개발자 정선우입니다. 현재는 경영학을
            전공하며, 다양한 프로젝트에 참여하고 있습니다. 제 블로그에서는 개발,
            학교생활, 그리고 경영에 대한 제 생각과 경험을 공유하고 있습니다.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="mailto:me@ptg.kr"
              aria-label="Send Mail"
              icon={MailIcon}
            />
            <SocialLink
              href="https://www.instagram.com/simon_jeong0808/"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/seonwoo0808"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/seonwoo0808/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articleMetas.map((articleMeta) => (
              <ArticleElement key={articleMeta.key} articleMeta={articleMeta} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
