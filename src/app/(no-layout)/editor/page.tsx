'use client'

import ArticleContent from '@/components/ArticleContent'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { formatDate } from '@/lib/formatDate'
import { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'

export default function EditorPage() {
  const [title, setTitle] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  )
  const [createdDate, setCreatedDate] = useState(new Date())
  const [description, setDescription] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  )
  const [markdown, setMarkdown] = useState(
    '# Editor Preview\n\nThis is a preview of the editor page.\n\nYou can edit this content in the editor on the right side asdfasdfsafdsdfasdfsadf',
  )

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('editorData') || '{}')
    setTitle(
      savedData.title ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    )
    setDescription(
      savedData.description ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    )
    setCreatedDate(
      savedData.createdDate ? new Date(savedData.createdDate) : new Date(),
    )
    setMarkdown(
      savedData.markdown ||
        '# Editor Preview\n\nThis is a preview of the editor page.\n\nYou can edit this content in the editor on the right side asdfasdfsafdsdfasdfsadf',
    )
  }, [])

  const handleSave = () => {
    // Save to localstorage
    localStorage.setItem(
      'editorData',
      JSON.stringify({
        title,
        description,
        createdDate: createdDate.toISOString(),
        markdown,
      }),
    )
  }

  return (
    // 2 column layout with left side for preview and right side for editor
    <div className="flex h-screen">
      <div className="fixed inset-0 flex">
        <div className="flex w-full max-w-3/5">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">
          <RemoteMdxPreview
            key={markdown}
            title={title}
            description={description}
            createdDate={createdDate}
            markdown={markdown}
          />
        </main>
        <Footer />
      </div>
      <div className="fixed top-0 right-0 overflow-scroll">
        <div className="flex w-full">
          <h1 className="p-4 text-3xl font-bold">Editor</h1>
          <a
            href="/editor/login"
            className="mt-4 mr-4 ml-auto inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Proceed Post
          </a>
        </div>

        {/* edit title, description, created date and markdown content */}
        <div className="p-4">
          <label className="mb-2 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              handleSave() // Save to localstorage on title change
            }}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <label className="mb-2 block">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              handleSave() // Save to localstorage on description change
            }}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <label className="mb-2 block">Created Date</label>
          <input
            type="date"
            value={createdDate.toISOString().split('T')[0]}
            onChange={(e) => {
              const date = new Date(e.target.value)
              setCreatedDate(date)
              handleSave() // Save to localstorage on date change
            }}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div className="">
          <MDEditor
            value={markdown}
            onChange={(val) => {
              console.log('Markdown changed:', val)
              setMarkdown(val ?? '')
              handleSave() // Save to localstorage on markdown change
            }}
            preview="edit"
            style={{ minHeight: '100vh', width: '40vw' }}
          />
          {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </div>
      </div>
    </div>
  )
}

function RemoteMdxPreview({
  title,
  description,
  createdDate,
  markdown,
}: {
  title: string
  description: string
  createdDate: Date
  markdown: string
}) {
  const metadata = {
    title: title,
    description: description,
    createdDate: createdDate,
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {metadata.title}
              </h1>
              <p className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(metadata.createdDate)}</span>
              </p>
            </header>
            <ArticleContent content={markdown} />
          </article>
        </div>
      </div>
    </Container>
  )
}
