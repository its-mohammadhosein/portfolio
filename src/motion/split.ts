/**
 * Split an element's text into word and character spans, keeping inline markup (<em>, .highlight,
 * <br>) intact. Words are inline-block so they never break mid-word; chars are what animate.
 * Screen readers get the original text through aria-label.
 */
export const splitText = (el: HTMLElement): HTMLElement[] => {
  if (el.dataset.split === 'true') {
    return Array.from(el.querySelectorAll<HTMLElement>('[data-char]'))
  }
  const label = el.textContent?.replace(/\s+/g, ' ').trim()
  if (label && !el.getAttribute('aria-label')) el.setAttribute('aria-label', label)

  const chars: HTMLElement[] = []
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? ''
        if (!text.trim()) return
        const fragment = document.createDocumentFragment()
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(' '))
            return
          }
          const word = document.createElement('span')
          word.className = 'split-word'
          word.setAttribute('aria-hidden', 'true')
          Array.from(part).forEach((ch) => {
            const span = document.createElement('span')
            span.className = 'split-char'
            span.dataset.char = ''
            span.textContent = ch
            word.appendChild(span)
            chars.push(span)
          })
          fragment.appendChild(word)
        })
        child.replaceWith(fragment)
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child)
      }
    })
  }
  walk(el)
  el.dataset.split = 'true'
  return chars
}
