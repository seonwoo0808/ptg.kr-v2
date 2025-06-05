'use client'

import { useEffect, useState } from 'react'

export default function LoginToPostPage() {
  const [title, setTitle] = useState<string>('포스트 제목')
  const [uploading, setUploading] = useState<boolean>(false)
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('editorData') || '{}')
    if (!savedData.title) {
      console.error('Title is not a string:', savedData.title)
      return
    }
    setTitle(savedData.title)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const savedData = JSON.parse(localStorage.getItem('editorData') || '{}')

    try {
      const res = await fetch('/editor/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
        body: JSON.stringify({
          title: savedData.title,
          description: savedData.description,
          markdown: savedData.markdown,
          createdDate: savedData.createdDate,
          slug: savedData.slug,
        }),
      })
      if (!res.ok) {
        throw new Error('Failed to submit')
      }
      // handle success -> redirect
      const responseData = await res.json()
      if (responseData.message === 'File uploaded successfully') {
        // Redirect to the post page or show success message
        window.location.href = `/blog/${encodeURIComponent(responseData.key)}`
      } else {
        // handle error (e.g., show error message)
        console.error('Submission failed:', responseData.message)
      }
    } catch (error) {
      // handle error (e.g., show error message)
      alert('로그인 실패: ' + error)
      setUploading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Sign in to upload your post
          </h2>
          <p className="mt-2 text-center text-sm/6 text-gray-500 dark:text-gray-400">
            업로드 할 포스트 제목: <strong>{title}</strong>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800 dark:text-gray-100 dark:outline-gray-600 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800 dark:text-gray-100 dark:outline-gray-600 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              {uploading ? (
                <button
                  type="submit"
                  disabled
                  className="flex w-full cursor-not-allowed justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white opacity-50 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="animate-spin">Uploading...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
