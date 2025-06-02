export const runtime = 'edge';

import Image, { type ImageProps } from 'next/image'
import { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
  }
}
