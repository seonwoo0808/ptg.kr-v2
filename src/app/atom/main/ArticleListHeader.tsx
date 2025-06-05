'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MainPageArticleListHeader() {
  return (
    <motion.div
      className="flex justify-between"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="self-center text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">
        Latest Articles
      </h2>

      <Link
        href="/blog"
        className="self-center rounded-lg px-4 py-3 text-sm font-semibold text-teal-500 transition-colors hover:bg-teal-50 hover:text-zinc-600 dark:text-teal-400 dark:hover:bg-zinc-800 dark:hover:text-teal-300"
      >
        View all articles
      </Link>
    </motion.div>
  )
}
