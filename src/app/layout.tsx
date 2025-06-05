import { type Metadata } from 'next'
import localFont from 'next/font/local'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { headers } from 'next/headers'

const pretendardStd = localFont({
  src: [
    {
      path: '../../public/fonts/woff2/PretendardStd-Thin.woff2',
      style: 'normal',
      weight: '100',
    },
    {
      path: '../../public/fonts/woff2/PretendardStd-ExtraLight.woff2',
      style: 'normal',
      weight: '200',
    },
    {
      path: '../../public/fonts/woff2/PretendardStd-Light.woff2',
      style: 'normal',
      weight: '300',
    },
    {
      path: '../../public/fonts/woff2/PretendardStd-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/fonts/woff2/PretendardStd-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../public/fonts/woff2/PretendardStd-SemiBold.woff2',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../../public/fonts/woff2/PretendardStd-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../../public/fonts/woff2/PretendardStd-ExtraBold.woff2',
      style: 'normal',
      weight: '800',
    },
    {
      path: '../../public/fonts/woff2/PretendardStd-Black.woff2',
      style: 'normal',
      weight: '900',
    },
  ],
})

export const metadata: Metadata = {
  title: {
    template: '%s - 정선우',
    default: '정선우 - Developer',
  },
  description:
    '안녕하세요! 저는 백엔드 개발자 정선우입니다. 현재는 경영학을 전공하며, 다양한 프로젝트에 참여하고 있습니다. 제 블로그에서는 개발, 학교생활, 그리고 경영에 대한 제 생각과 경험을 공유하고 있습니다.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const requestUrl = (await headers()).get('x-url')
  // parse url and get uri
  if (requestUrl) {
    const url = new URL(requestUrl)
    if (url.pathname === '/editor'){
      return (
      <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={
          pretendardStd.className + ' flex h-full bg-zinc-50 dark:bg-black'
        }
      >
        <Providers>
          <div className="flex w-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
      )
    }
  }
  return (
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={
          pretendardStd.className + ' flex h-full bg-zinc-50 dark:bg-black'
        }
      >
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
