import { Container } from '@/components/Container'

import ArticleList from '@/components/ArticleList'
import MainPageHeroSection from '../atom/main/HeroSection'
import MainPageArticleListHeader from '../atom/main/ArticleListHeader'
import MainPagePhotoSection from '../atom/main/PhotoSection'
import MainPageNewsLetterSection from '../atom/main/NewsLetterSection'
import MainPageResumeSection from '../atom/main/ResumeSection'

export default async function Home() {
  return (
    <>
      <MainPageHeroSection />
      <MainPagePhotoSection />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <MainPageArticleListHeader />
            <ArticleList limit={4} />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <MainPageNewsLetterSection />
            <MainPageResumeSection />
          </div>
        </div>
      </Container>
    </>
  )
}
