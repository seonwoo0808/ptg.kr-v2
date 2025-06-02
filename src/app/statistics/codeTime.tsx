'use client'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { html } from 'cheerio'
import { useEffect, useState } from 'react'

export default function CodeTime({}: {}) {
  const [totalCodetime, setTotalCodeTime] = useState('Loading...')
  const [averageCodetime, setAverageCodeTime] = useState('Loading...')
  const [goFileRatio, setGoFileRatio] = useState('Loading...')
  const [sqlFileRatio, setSqlFileRatio] = useState('Loading...')
  const [htmlFileRatio, setHtmlFileRatio] = useState('Loading...')
  const [typescriptFileRatio, setTypescriptFileRatio] = useState('Loading...')
  const codetimeUrl =
    'https://wakatime.com/share/@PENTAGON/814f6085-90b4-4431-9901-1f49d0420024.json'
  const languagesUrl =
    'https://wakatime.com/share/@PENTAGON/0e58a7c2-ce6c-4121-8a04-404b4d33def8.json'

  useEffect(() => {
    fetch(codetimeUrl)
      .then((response) => response.json())
      .then((data) => {
        setTotalCodeTime(
          data.data.grand_total.human_readable_total_including_other_language,
        )
        setAverageCodeTime(
          data.data.grand_total
            .human_readable_daily_average_including_other_language,
        )
      })
      .catch((error) => {
        console.error('Error fetching code time:', error)
        setTotalCodeTime('Error loading code time')
      })
    fetch(languagesUrl)
      .then((response) => response.json())
      .then((data) => {
        for (const language of data.data) {
          if (language.name === 'Go') {
            setGoFileRatio(language.percent + '%')
          } else if (language.name === 'SQL') {
            setSqlFileRatio(language.percent + '%')
          } else if (language.name === 'HTML') {
            setHtmlFileRatio(language.percent + '%')
          } else if (language.name === 'TypeScript') {
            setTypescriptFileRatio(language.percent + '%')
          }
        }
      })
  }, [])

  return (
    // 2 columns layout
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <StatusSection title="Code Time">
        <Card as="article">
          <Card.Title as="h3">{totalCodetime}</Card.Title>
          <Card.Eyebrow decorate>Total Code Time</Card.Eyebrow>
          <Card.Description>
            2022년 12월 부터 계측된 총 코딩 시간입니다.
          </Card.Description>
        </Card>
        <Card as="article">
          <Card.Title as="h3">{averageCodetime}</Card.Title>
          <Card.Eyebrow decorate>Daily Average</Card.Eyebrow>
          <Card.Description>
            2022년 12월 부터 계측된 일 평균 코딩 시간입니다.
          </Card.Description>
        </Card>
      </StatusSection>
      {/* Divider for small screens */}
      <hr className="my-4 text-gray-300 md:hidden dark:text-gray-500" />
      <StatusSection title="Languages">
        <Card as="article">
          <Card.Title as="h3">{goFileRatio}</Card.Title>
          <Card.Eyebrow decorate>Go</Card.Eyebrow>
          <Card.Description>전체 시간중 .go 파일 비중입니다.</Card.Description>
        </Card>
        <Card as="article">
          <Card.Title as="h3">{sqlFileRatio}</Card.Title>
          <Card.Eyebrow decorate>SQL</Card.Eyebrow>
          <Card.Description>전체 시간중 .sql 파일 비중입니다.</Card.Description>
        </Card>
        <Card as="article">
          <Card.Title as="h3">{htmlFileRatio}</Card.Title>
          <Card.Eyebrow decorate>HTML</Card.Eyebrow>
          <Card.Description>
            전체 시간중 .html 파일 비중입니다.
          </Card.Description>
        </Card>
        <Card as="article">
          <Card.Title as="h3">{typescriptFileRatio}</Card.Title>
          <Card.Eyebrow decorate>Typescript</Card.Eyebrow>
          <Card.Description>
            전체 시간중 .ts, .tsx 파일 비중입니다.
          </Card.Description>
        </Card>
      </StatusSection>
    </div>
  )
}

function StatusSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}
