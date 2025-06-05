'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  // https://github.com/giscus/giscus/tree/main/styles/themes
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const scriptElem = document.createElement('script')
    scriptElem.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'

    scriptElem.setAttribute('data-repo', 'seonwoo0808/ptg.kr-v2')
    scriptElem.setAttribute('data-repo-id', 'R_kgDOO0i0PA')
    scriptElem.setAttribute('data-category', 'Comment')
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOO0i0PM4CrFI8')
    scriptElem.setAttribute('data-mapping', 'pathname')
    scriptElem.setAttribute('data-strict', '1')
    scriptElem.setAttribute('data-reactions-enabled', '1')
    scriptElem.setAttribute('data-emit-metadata', '0')
    scriptElem.setAttribute('data-input-position', 'bottom')
    scriptElem.setAttribute('data-theme', theme)
    scriptElem.setAttribute('data-lang', 'ko')
    scriptElem.setAttribute('data-loading', 'lazy')
    ref.current.appendChild(scriptElem)
  }, [theme])

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    )
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app',
    )
  }, [theme])

  return <section ref={ref} />
}

{
  /* <script
  src="https://giscus.app/client.js"
  data-repo="seonwoo0808/ptg.kr-v2"
  data-repo-id="R_kgDOO0i0PA"
  data-category="Comment"
  data-category-id="DIC_kwDOO0i0PM4CrFI8"
  data-mapping="pathname"
  data-strict="1"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="ko"
  data-loading="lazy"
  crossorigin="anonymous"
  async
></script> */
}
