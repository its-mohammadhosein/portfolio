import React, { Fragment } from 'react'

/**
 * Renders the display-title markup from `displayTitle` fields:
 *   one line per row, *text* → <em>, ==text== → <span class="highlight">
 */
const INLINE = /(\*[^*\n]+\*|==[^=\n]+==)/g

const renderInline = (line: string) =>
  line.split(INLINE).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    if (part.startsWith('==') && part.endsWith('==') && part.length > 4) {
      return (
        <span className="highlight" key={i}>
          {part.slice(2, -2)}
        </span>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })

export const titleLines = (text?: string | null) =>
  (text ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

/** Plain text of the markup, e.g. for alt text or metadata */
export const titlePlainText = (text?: string | null) =>
  titleLines(text)
    .map((line) => line.replace(/\*([^*]+)\*/g, '$1').replace(/==([^=]+)==/g, '$1'))
    .join(' ')

export const TitleMarkup: React.FC<{
  text?: string | null
  /** Render each line as its own block (default) or join lines with <br> */
  lineClassName?: string
  asLines?: boolean
}> = ({ text, lineClassName, asLines = true }) => {
  const lines = titleLines(text)
  if (!asLines) {
    return (
      <>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {renderInline(line)}
          </Fragment>
        ))}
      </>
    )
  }
  return (
    <>
      {lines.map((line, i) => (
        <span className={lineClassName ?? 'block'} key={i}>
          {renderInline(line)}
        </span>
      ))}
    </>
  )
}
