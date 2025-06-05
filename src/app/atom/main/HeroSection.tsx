'use client'

import { Container } from '@/components/Container'
import Link from 'next/link'

import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/icons/SocialIcons'
import MailIcon from '@/components/icons/Mail'
import { motion } from 'framer-motion'

export default function MainPageHeroSection() {
  return (
    <Container className="mt-9">
      <div className="max-w-2xl">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Back-End Developer, Student, and Junior Entrepreneur.
        </motion.h1>
        <motion.p
          className="mt-6 text-base break-keep text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          안녕하세요! 저는 백엔드 개발자 정선우입니다. 현재는 경영학을 전공하며,
          다양한 프로젝트에 참여하고 있습니다. 제 블로그에서는 개발, 학교생활,
          그리고 경영에 대한 제 생각과 경험을 공유하고 있습니다.
        </motion.p>
        <div className="mt-6 flex gap-6">
          {/** Add framer-motion for social links */}
          {[
            {
              href: 'mailto:me@ptg.kr',
              ariaLabel: 'Send Mail',
              icon: MailIcon,
            },
            {
              href: 'https://www.instagram.com/simon_jeong0808/',
              ariaLabel: 'Follow on Instagram',
              icon: InstagramIcon,
            },
            {
              href: 'https://github.com/seonwoo0808',
              ariaLabel: 'Follow on GitHub',
              icon: GitHubIcon,
            },
            {
              href: 'https://www.linkedin.com/in/seonwoo0808/',
              ariaLabel: 'Follow on LinkedIn',
              icon: LinkedInIcon,
            },
          ].map((item, idx) => {
            // Lazy import to avoid SSR issues if needed
            // import { motion } from 'framer-motion'
            // But for this file, add at the top: import { motion } from 'framer-motion'
            // Animate in with a fade and slight up movement
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <SocialLink
                  href={item.href}
                  aria-label={item.ariaLabel}
                  icon={item.icon}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

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
