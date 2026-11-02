'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const {
    card: { ref: cardRef },
    link: { ref: linkRef },
  } = useClickableCard<HTMLElement>({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article className={cn('group overflow-hidden hover:cursor-pointer', className)} ref={cardRef}>
      <div className="relative aspect-[1/0.8064] w-full overflow-hidden bg-line after:absolute after:inset-0 after:bg-black after:opacity-0 after:transition-opacity after:duration-[250ms] group-hover:after:opacity-35">
        {!metaImage && <div className="type-small p-4 text-steel">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            fill
            imgClassName="object-cover"
            pictureClassName="absolute inset-0"
            resource={metaImage}
            size="33vw"
          />
        )}
      </div>
      <div className="pt-4">
        {showCategories && hasCategories && (
          <div className="type-caption mb-2 text-steel">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category

                const categoryTitle = titleFromCategory || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
        )}
        {titleToUse && (
          <h3 className="font-display text-[1.0625rem] leading-[1.2] font-medium uppercase">
            <Link href={href} ref={linkRef}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && (
          <div className="type-small mt-2 text-steel">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </article>
  )
}
