import NextLink from 'next/link'

// --- Icons
import External from 'components/icons/External'

// --- Others
import { isExternalLink } from 'lib/helper'

const Wrapper = ({ url = undefined, children, ...others }) => {
  if (!url) return <div {...others}>{children}</div>
  const isExternal = isExternalLink(url)

  if (isExternal) {
    const href = `${url}?ref=onur.dev`
    return (
      <a href={href} {...others}>
        {children}
      </a>
    )
  }

  return (
    <div>
      <NextLink href={url}>
        <a {...others}>{children}</a>
      </NextLink>
    </div>
  )
}

const Card = ({ title, primaryText, secondaryText, url = undefined, ...others }) => {
  let isExternal = false
  if (url) isExternal = isExternalLink(url)

  return (
    <div className="space-y-1">
      {primaryText && <div className="text-gray-500 leading-7">{primaryText}</div>}
      <Wrapper
        url={url}
        className={`inline-block text-lg font-semibold${url ? ' underline-under hover:underline' : ''}`}
        {...(isExternal && {
          rel: 'noopener noreferrer',
          target: '_blank'
        })}
        {...others}
      >
        {title}
        {isExternal && (
          <span className="ml-1 inline-block">
            <External height={14} width={14} />
          </span>
        )}
      </Wrapper>
      {secondaryText && <div className="text-gray-500 leading-7 overflow-hidden md:line-clamp-2">{secondaryText}</div>}
    </div>
  )
}

export default Card
