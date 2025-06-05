import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/icons/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import MailIcon from '@/components/icons/Mail'
import CalendarIcon from '@/components/icons/Calendar'
import UserIcon from '@/components/icons/User'
import AcademicIcon from '@/components/icons/Academic'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function SocialInfo({
  title,
  className,
  icon: Icon,
  children,
}: {
  title?: string
  className?: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className={clsx(className, 'flex items-center text-sm font-medium')}>
      <Icon className="mr-2 h-6 w-6 flex-none fill-zinc-500 dark:fill-zinc-400" />
      {title && (
        <span className="mr-3 w-12 text-zinc-500 dark:text-zinc-300">
          {title}
        </span>
      )}
      <span className="font-bold text-zinc-800 dark:text-zinc-200">
        {children}
      </span>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Seonwoo Jeong, the Back-End Developer.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Live for the future.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              안녕하세요. 인하대학교 경영학과에 재학 중인 백엔드 개발자
              정선우입니다. 사용자에게 안정적이고 신뢰할 수 있는 서비스를
              제공하는 데 매력을 느껴 백엔드 개발에 입문하게 되었고, 현재는 서버
              개발과 시스템 아키텍처에 깊은 관심을 가지고 다양한 프로젝트에
              참여하고 있습니다. 경영학과의 전공 지식을 바탕으로 기술과
              비즈니스를 함께 이해하려는 시도를 꾸준히 이어가고 있습니다.
            </p>
            <p>
              저는 주로 Go와 Python을 활용해 RESTful API를 개발하고,
              데이터베이스 설계와 운영, 그리고 클라우드 환경에서의 배포까지
              전반적인 백엔드 시스템 구축 경험을 쌓아가고 있습니다. 실제 사용자
              요구사항을 반영한 서비스 개발을 중요하게 생각하며, 이를 위해 기획
              단계부터 적극적으로 소통하고 참여하는 것을 선호합니다.
            </p>
            <p>
              학업과 병행하여 여러 팀 프로젝트와 개인 프로젝트를 진행하며, 협업
              도구와 버전 관리 시스템에도 익숙해졌습니다. 특히 코드의 품질과
              유지보수성을 높이는 데에 관심이 많아, 테스트 코드 작성과 문서화도
              중요하게 여기고 있습니다. 프로젝트의 성패는 기술뿐 아니라 소통과
              책임감에서도 갈린다는 것을 느끼며, 항상 성실하고 꾸준한 태도로
              임하고 있습니다.
            </p>
            <p>
              앞으로는 더욱 확장성 있고 효율적인 시스템을 설계하는 개발자로
              성장하고 싶습니다. 기술의 깊이를 더해가며, 동시에 비즈니스
              관점에서 가치 있는 서비스를 고민하는 개발자가 되기 위해 계속해서
              배우고 도전하겠습니다.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialInfo icon={UserIcon} title="Name" className="pb-6">
              정선우 / Seonwoo Jeong
            </SocialInfo>
            <SocialInfo icon={CalendarIcon} title="Birth" className="pb-6">
              August 2006
            </SocialInfo>
            <SocialInfo icon={AcademicIcon} title="School" className="pb-6">
              인하대학교 경영학과 재학중
            </SocialInfo>
            <Link
              className={clsx(
                'flex items-center border-b border-zinc-100 pb-6 text-sm font-medium dark:border-zinc-700/40',
              )}
              href="mailto:me@ptg.kr"
            >
              <MailIcon className="mr-2 h-6 w-6 flex-none fill-zinc-500 dark:fill-zinc-400" />
              <span className="mr-3 w-12 text-zinc-500 dark:text-zinc-300">
                E-Mail
              </span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                me@ptg.kr
              </span>
            </Link>
            {/* <SocialLink
              href="mailto:me@ptg.kr"
              icon={MailIcon}
              className="border-b border-zinc-100 pb-4 dark:border-zinc-700/40"
            >
              E-Mail: me@ptg.kr
            </SocialLink> */}
            <SocialLink
              href="https://www.instagram.com/simon_jeong0808"
              icon={InstagramIcon}
              className="mt-6"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/seonwoo0808"
              icon={GitHubIcon}
              className="mt-6"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/seonwoo0808"
              icon={LinkedInIcon}
              className="mt-6"
            >
              Follow on LinkedIn
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
