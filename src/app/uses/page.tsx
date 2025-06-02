import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="제가 사용하고 있는 소프트웨어, 기기에 대해 공유합니다. 개발 환경을 구축할 때 도움이 될 수 있기를 바랍니다."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="16” MacBook Pro, M4 Pro (2024)">
            메인 개발 랩탑. 48GB RAM 1TB SSD로 구성되어 있습니다.
          </Tool>
          <Tool title="Dell UltraSharp 27 4K - U2723QE">
            4K 해상도의 27인치 모니터. 4K 해상도는 정말 좋지만, 추후 120Hz,
            Thunderbolt를 지원하는 버전으로 업그레이드 예정.
          </Tool>
          <Tool title="Mistel MD770 BAROCCO Split Keyboard(Customized)">
            어깨와 손목 통증을 줄이기 위해 스플릿 키보드를 사용합니다. 솔더링을
            통해 TTC 아이스 프로즌 저소음 V2로 스위치를 교체하였습니다.
          </Tool>
          <Tool title="Apple Magic Trackpad 2(Space Gray)">
            트랙패드가 없는 작업은 상상할 수 없습니다. 맥북의 트랙패드보다 훨씬
            넓고 편리합니다. 현재 스페이스 그레이가 단종되어 아쉬운 상황입니다.
          </Tool>
          <Tool title="Sidiz T20 Computer Chair">
            의자는 매우 중요합니다. 가성비가 좋은 의자라고 생각합니다.
          </Tool>
          <Tool title="AMD 5900X, RTX 3090, DDR4 128GB, 4TB SSD, 16TB HDD">
            딥러닝 및 고성능 컴퓨팅을 위한 데스크탑입니다. 윈도우를 깔아 가끔
            게임도 합니다.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Visual Studio Code">
            주력으로 사용하는 IDE입니다. 주로 Go, Python, Typescript 등을
            작성할때 사용합니다.
          </Tool>
          <Tool title="Warp">
            Warp는 iTerm2를 대체하는 새로운 터미널입니다. 빠른 속도와 직관적인
            UI로 개발 환경을 개선해줍니다.
          </Tool>
          <Tool title="Clion">
            학교 과제나 개인 프로젝트에서 C/C++ 개발을 할 때 사용하는 IDE입니다.
            JetBrains의 IDE는 무거운거 만 빼면 정말 좋습니다. 특히 C/C++ 개발에
            최적화되어 있어 코드 작성과 디버깅이 매우 편리합니다.
          </Tool>
          <Tool title="Datagrip">
            JetBrains의 데이터베이스 IDE입니다. SQL 작성과 데이터베이스 관리에
            매우 유용합니다. 특히 여러 데이터베이스를 동시에 관리할 수 있어
            편리합니다.
          </Tool>
          <Tool title="ApiDog">
            API 문서를 작성하고 협업할 때 사용하는 도구입니다. Swagger와 비슷한
            기능을 제공하며, API 문서 작성과 테스트를 쉽게 할 수 있습니다.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
