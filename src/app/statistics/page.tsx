import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'
import CodeTime from './codeTime'

export const metadata: Metadata = {
  title: 'Status',
  description: '현재 프로그래밍 관련 통계를 공유합니다',
}

export default function Statistics() {
  return (
    <SimpleLayout
      title="Never Stop Learning and Typing."
      intro="프로그래밍은 끊임없는 학습과 실천의 연속이라고 생각합니다.\n 제가 지금까지 해온 프로그래밍 통계치를 공유합니다."
    >
      <div className="space-y-20">
        <CodeTime />
      </div>
    </SimpleLayout>
  )
}
